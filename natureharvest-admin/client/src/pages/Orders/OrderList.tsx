import React, { useState } from "react";
import { Link } from "react-router-dom";
import ComponentCard from "../../components/common/ComponentCard";

const OrderList: React.FC = () => {
  const [orders] = useState([
    {
      id: "ORD-001",
      customer: "John Doe",
      product: "Orange Fresh Juice",
      amount: "$12.99",
      status: "pending",
      date: "2024-01-15",
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      product: "Apple Delight Blend",
      amount: "$15.99",
      status: "shipped",
      date: "2024-01-14",
    },
    {
      id: "ORD-003",
      customer: "Mike Johnson",
      product: "Berry Blast Mix",
      amount: "$18.99",
      status: "delivered",
      date: "2024-01-13",
    },
  ]);

  const statusConfig = {
    pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
    shipped: { color: 'bg-leaf-light/20 text-leaf-dark', label: 'Shipped' },
    delivered: { color: 'bg-green-100 text-green-800', label: 'Delivered' },
    cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled' },
  };

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <ComponentCard title="All Orders" desc="Manage and track customer orders">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left font-medium text-gray-700">Order ID</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Customer</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Product</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Amount</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Status</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Date</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{order.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{order.customer}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{order.product}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{order.amount}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusConfig[order.status as keyof typeof statusConfig].color}`}>
                      {statusConfig[order.status as keyof typeof statusConfig].label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{order.date}</td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/orders/${order.id}`}
                      className="text-logo-red hover:text-red-700 font-medium text-sm"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ComponentCard>
    </div>
  );
};

export default OrderList; 