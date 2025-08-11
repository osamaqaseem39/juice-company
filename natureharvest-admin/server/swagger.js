const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Nature Harvest Juice Company API',
      version: '1.0.0',
      description: 'Complete API documentation for the Nature Harvest Juice Company admin dashboard and web application',
      contact: {
        name: 'API Support',
        email: 'support@natureharvest.com',
        url: 'https://natureharvest.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'https://juice-company-server.vercel.app',
        description: 'Production Server',
      },
      {
        url: 'http://localhost:3002',
        description: 'Development Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT token for authentication'
        },
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message'
            },
            error: {
              type: 'string',
              description: 'Error type'
            }
          }
        },
        Success: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Success message'
            },
            data: {
              type: 'object',
              description: 'Response data'
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      {
        name: 'Authentication',
        description: 'User authentication and authorization endpoints'
      },
      {
        name: 'Blogs',
        description: 'Blog post management endpoints'
      },
      {
        name: 'Products',
        description: 'Product management endpoints'
      },
      {
        name: 'Categories',
        description: 'Product category management endpoints'
      },
      {
        name: 'SubCategories',
        description: 'Product subcategory management endpoints'
      },
      {
        name: 'Brands',
        description: 'Brand management endpoints'
      },
      {
        name: 'Flavors',
        description: 'Flavor and size management endpoints'
      },
      {
        name: 'Services',
        description: 'Service management endpoints'
      },
      {
        name: 'Quotes',
        description: 'Quote management endpoints'
      },
      {
        name: 'Health',
        description: 'Server health and status endpoints'
      }
    ]
  },
  apis: ['./routes/*.js', './models/*.js', './controllers/*.js'],
};

const specs = swaggerJsdoc(options);

// Validate that specs were generated properly
if (!specs || !specs.paths) {
  console.error('❌ Swagger specs generation failed');
  console.error('Specs object:', specs);
} else {
  console.log('✅ Swagger specs generated successfully');
  console.log('Available paths:', Object.keys(specs.paths || {}));
}

module.exports = specs; 