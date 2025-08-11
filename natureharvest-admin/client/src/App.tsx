import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { store } from './redux/store';
import { client } from './services/graphqlClient';
import AppLayout from "./layout/AppLayout";
import AuthLayout from "./layout/AuthLayout";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/OtherPage/NotFound";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import BlogList from "./pages/Blog/BlogList";
import BlogForm from "./pages/Blog/BlogForm";
import BlogDetail from "./pages/Blog/BlogDetail";
import ProductList from './pages/Products/ProductList';
import ProductForm from './pages/Products/ProductForm';
import ProductDetail from './pages/Products/ProductDetail';
import ServiceList from './pages/Services/ServiceList';
import ServiceForm from './pages/Services/ServiceForm';
import ServiceDetail from './pages/Services/ServiceDetail';
import MessageList from "./pages/Messages/MessageList";
import BrandList from './pages/Brands/BrandList';
import BrandForm from './pages/Brands/BrandForm';
import CategoryList from './pages/Categories/CategoryList';
import CategoryForm from './pages/Categories/CategoryForm';
import SubCategoryForm from './pages/Categories/SubCategoryForm';
import FlavorList from './pages/Flavors/FlavorList';
import FlavorForm from './pages/Flavors/FlavorForm';
import FlavorDetail from './pages/Flavors/FlavorDetail';
import SizeList from './pages/Sizes/SizeList';
import SizeForm from './pages/Sizes/SizeForm';
import SizeDetail from './pages/Sizes/SizeDetail';


export default function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Router>
          <Routes>
            {/* Auth Layout - Public Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>

            {/* Protected Dashboard Layout */}
            <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              {/* Main Dashboard */}
              <Route index element={<Dashboard />} />

              {/* Blog Routes */}
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/add" element={<BlogForm mode='add' />} />
              <Route path="/blog/edit/:id" element={<BlogForm mode='edit' />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />

              {/* Products Routes */}
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/add" element={<ProductForm />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/products/:id/edit" element={<ProductForm />} />

              {/* Services Routes */}
              <Route path="/services" element={<ServiceList />} />
              <Route path="/services/add" element={<ServiceForm />} />
              <Route path="/services/:id" element={<ServiceDetail />} />
              <Route path="/services/:id/edit" element={<ServiceForm />} />

              {/* Brand Routes */}
              <Route path="/brands" element={<BrandList />} />
              <Route path="/brands/add" element={<BrandForm mode='add' />} />
              <Route path="/brands/:id/edit" element={<BrandForm mode='edit' />} />

              {/* Category Routes */}
              <Route path="/categories" element={<CategoryList />} />
              <Route path="/categories/add" element={<CategoryForm mode='add' />} />
              <Route path="/categories/:id/edit" element={<CategoryForm mode='edit' />} />

              {/* Subcategory Routes */}
              <Route path="/subcategories" element={<CategoryList isSubcategoryList={true} />} />
              <Route path="/subcategories/add" element={<SubCategoryForm mode='add' />} />
              <Route path="/subcategories/:id/edit" element={<SubCategoryForm mode='edit' />} />

              {/* Flavor Routes */}
              <Route path="/flavors" element={<FlavorList />} />
              <Route path="/flavors/add" element={<FlavorForm />} />
              <Route path="/flavors/:id" element={<FlavorDetail />} />
              <Route path="/flavors/:id/edit" element={<FlavorForm />} />

              {/* Size Routes */}
              <Route path="/sizes" element={<SizeList />} />
              <Route path="/sizes/add" element={<SizeForm />} />
              <Route path="/sizes/:id" element={<SizeDetail />} />
              <Route path="/sizes/:id/edit" element={<SizeForm />} />

              <Route path="/messages" element={<MessageList/>}/>
            </Route>

            {/* Fallback Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </Provider>
    </ApolloProvider>
  );
}
