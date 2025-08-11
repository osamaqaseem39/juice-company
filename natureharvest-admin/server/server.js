const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const http = require('http');

// Import GraphQL schema
const schema = require('./schema');

// Import authentication middleware
const graphqlAuth = require('./middleware/graphqlAuth');

// Load environment variables
dotenv.config();

// Import environment configuration
const ENV = require('./config/env');

const app = express();

// Middleware - CORS must be first!
const allowedOrigins = ENV.ALLOWED_ORIGINS;

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // In development, allow all origins
    if (ENV.IS_DEVELOPMENT) {
      return callback(null, true);
    }
    
    // In production, check against allowed origins
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log(`CORS blocked origin: ${origin}`);
      console.log(`Allowed origins: ${allowedOrigins.join(', ')}`);
      callback(null, false); // Don't throw error, just return false
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'x-auth-token',
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Methods',
    'Access-Control-Allow-Credentials',
    'X-Requested-With'
  ],
  exposedHeaders: [
    'Content-Type',
    'Authorization',
    'x-auth-token'
  ],
  optionsSuccessStatus: 200
}));

// Also add a pre-flight middleware to ensure headers are set
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token');
  next();
});

// Other middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set proper MIME types for JavaScript files
app.use((req, res, next) => {
  if (req.path.endsWith('.js')) {
    res.setHeader('Content-Type', 'application/javascript');
  }
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Check MongoDB connection middleware
app.use((req, res, next) => {
  const state = mongoose.connection.readyState;
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  
  if (state !== 1) {
    console.error('MongoDB not connected. Current state:', states[state] || 'unknown');
    console.error('Connection details:', {
      state: states[state] || 'unknown',
      host: mongoose.connection.host || 'unknown',
      name: mongoose.connection.name || 'unknown',
      port: mongoose.connection.port || 'unknown'
    });
    return res.status(503).json({ 
      message: 'Database connection not ready',
      state: states[state] || 'unknown',
      details: {
        host: mongoose.connection.host || 'unknown',
        name: mongoose.connection.name || 'unknown',
        port: mongoose.connection.port || 'unknown'
      }
    });
  }
  next();
});

// Handle OPTIONS requests
app.options('*', cors());

// Swagger documentation
try {
  // Serve the swagger spec as JSON FIRST (before Swagger UI)
  app.get('/api-docs/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpecs);
  });
  
  // Then serve Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, { 
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Juice Company API Documentation'
  }));
  
  console.log('✅ Swagger documentation configured successfully');
} catch (error) {
  console.error('❌ Error configuring Swagger:', error);
}

// MongoDB Connection with retry logic
const connectDB = async () => {
  try {
    const mongoURI = ENV.MONGODB_URI;
    
    if (!mongoURI) {
      console.error('❌ MONGODB_URI environment variable is not set');
      return false;
    }
    
    console.log('Attempting to connect to MongoDB...');
    console.log('MongoDB URI:', mongoURI.replace(/\/\/[^:]+:[^@]+@/, '//****:****@')); // Hide credentials in logs

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4,
      maxPoolSize: 10,
      minPoolSize: 5,
      retryWrites: true,
      w: 'majority',
      connectTimeoutMS: 10000,
      heartbeatFrequencyMS: 2000,
      retryReads: true
    };

    await mongoose.connect(mongoURI, options);
    console.log('✨ MongoDB Connected Successfully!');
    console.log(`📦 Database: ${mongoose.connection.name}`);
    console.log(`🌐 Host: ${mongoose.connection.host}`);
    global.mongoConnected = true;
    return true;
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err);
    console.error('Error details:', {
      name: err.name,
      message: err.message,
      code: err.code,
      state: mongoose.connection.readyState
    });
    global.mongoConnected = false;
    return false;
  }
};

// Monitor MongoDB connection
mongoose.connection.on('connected', () => {
  global.mongoConnected = true;
  console.log('🔄 MongoDB connection established');
});

mongoose.connection.on('error', (err) => {
  global.mongoConnected = false;
  console.error('🔴 MongoDB connection error:', err);
  console.error('Error details:', {
    name: err.name,
    message: err.message,
    code: err.code
  });
});

mongoose.connection.on('disconnected', () => {
  global.mongoConnected = false;
  console.log('🔸 MongoDB connection disconnected');
  // Attempt to reconnect
  setTimeout(connectDB, 5000);
});

// Initialize Apollo Server
const httpServer = http.createServer(app);

const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  introspection: true, // Enable introspection for development and production
  context: async ({ req }) => {
    const auth = await graphqlAuth(req);
    return {
      user: auth.user,
      models: {
        User: require('./models/User'),
        Blog: require('./models/Blog'),
        Product: require('./models/Product'),
        Brand: require('./models/Brand'),
        Category: require('./models/Category'),
        SubCategory: require('./models/SubCategory'),
        Quote: require('./models/Quote'),
        Service: require('./models/Service'),
        Company: require('./models/Company'),
        Flavor: require('./models/Flavor')
      }
    };
  },
  formatError: (error) => {
    console.error('GraphQL Error:', error);
    return {
      message: error.message,
      path: error.path,
      extensions: error.extensions
    };
  }
});

// Static file routes
app.use('/uploads/products', express.static(path.join(__dirname, '../uploads/products')));
app.use('/uploads/brochures', express.static(path.join(__dirname, '../uploads/brochures')));
app.use('/uploads/brand-category', express.static(path.join(__dirname, '../uploads/brand-category')));
app.use('/uploads/general', express.static(path.join(__dirname, '../uploads/general')));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/subcategories', require('./routes/subcategories'));
app.use('/api/brands', require('./routes/brands'));
app.use('/api/services', require('./routes/services'));
app.use('/api/quotes', require('./routes/quotes'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/flavors', require('./routes/flavors'));
app.use('/api', require('./routes/upload'));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     description: Check server and database health status
 *     responses:
 *       200:
 *         description: Server health status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [healthy, unhealthy]
 *                   description: Overall server health status
 *                 message:
 *                   type: string
 *                   description: Health status message
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   description: Current server timestamp
 *                 mongodb:
 *                   type: object
 *                   properties:
 *                     isConnected:
 *                       type: boolean
 *                       description: Whether MongoDB is connected
 *                     state:
 *                       type: string
 *                       description: MongoDB connection state
 *                     database:
 *                       type: string
 *                       description: Database name
 *                     host:
 *                       type: string
 *                       description: Database host
 *                     port:
 *                       type: string
 *                       description: Database port
 *                     models:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: Available Mongoose models
 *                     collections:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: Available database collections
 *                 server:
 *                   type: object
 *                   properties:
 *                     uptime:
 *                       type: number
 *                       description: Server uptime in seconds
 *                     memory:
 *                       type: object
 *                       description: Memory usage statistics
 *                     cpu:
 *                       type: object
 *                       description: CPU usage statistics
 *                     env:
 *                       type: string
 *                       description: Environment (development/production)
 *                     nodeVersion:
 *                       type: string
 *                       description: Node.js version
 *                     platform:
 *                       type: string
 *                       description: Operating system platform
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Root route for API health check
app.get('/', (req, res) => {
  const mongoStatus = {
    isConnected: mongoose.connection.readyState === 1,
    state: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState] || 'unknown',
    database: mongoose.connection.name || 'not connected',
    host: mongoose.connection.host || 'not connected',
    port: mongoose.connection.port || 'not connected',
    models: Object.keys(mongoose.models),
    collections: mongoose.connection.collections ? Object.keys(mongoose.connection.collections) : []
  };

  const serverStatus = {
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    cpu: process.cpuUsage(),
    env: process.env.NODE_ENV || 'development',
    nodeVersion: process.version,
    platform: process.platform
  };

  res.json({ 
    status: mongoStatus.isConnected ? 'healthy' : 'unhealthy',
    message: mongoStatus.isConnected ? 'Server is running' : 'Server is running but database is not connected',
    timestamp: new Date().toISOString(),
    mongodb: mongoStatus,
    server: serverStatus
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Start server only after MongoDB connection is established
const startServer = async () => {
  let retries = 5;
  let connected = false;

  while (retries > 0 && !connected) {
    console.log(`Attempting to connect to MongoDB (${retries} retries left)...`);
    connected = await connectDB();
    if (!connected) {
      retries--;
      if (retries > 0) {
        console.log('Waiting 5 seconds before retrying...');
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
  }

  if (!connected) {
    console.error('Failed to connect to MongoDB after multiple attempts');
    console.error('Please check your MONGODB_URI environment variable');
    console.error('For Vercel deployment, set MONGODB_URI in your project settings');
    
    // In production, we might want to start the server anyway for health checks
    if (ENV.IS_PRODUCTION) {
      console.log('Starting server in degraded mode (no database connection)');
    } else {
      process.exit(1);
    }
  }

  // Start Apollo Server
  await server.start();

  // Apply Apollo Server middleware with CORS
  app.use('/graphql', cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      // In development, allow all origins
      if (ENV.IS_DEVELOPMENT) {
        return callback(null, true);
      }
      
      // In production, check against allowed origins
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log(`GraphQL CORS blocked origin: ${origin}`);
        console.log(`Allowed origins: ${allowedOrigins.join(', ')}`);
        callback(null, false); // Don't throw error, just return false
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'x-auth-token',
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Methods',
      'Access-Control-Allow-Credentials',
      'X-Requested-With'
    ]
  }), expressMiddleware(server, {
    context: async ({ req }) => {
      const auth = await graphqlAuth(req);
      return {
        user: auth.user,
        models: {
          User: require('./models/User'),
          Blog: require('./models/Blog'),
          Product: require('./models/Product'),
          Brand: require('./models/Brand'),
          Category: require('./models/Category'),
          SubCategory: require('./models/SubCategory'),
          Quote: require('./models/Quote'),
          Service: require('./models/Service'),
          Company: require('./models/Company'),
          Flavor: require('./models/Flavor')
        }
      };
    }
  }));

  const PORT = ENV.PORT;
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`🔗 GraphQL endpoint: ${ENV.GRAPHQL_URL}`);
    console.log(`📚 Swagger documentation available at ${ENV.SWAGGER_URL}`);
  });
};

// Start the server
startServer(); 