"use client"

import { useState } from "react"
import {
  Bell,
  ChevronDown,
  Home,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
  Search,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react"
import Link from "next/link"

import { Button } from "../components/button"

import { rawMaterials } from "../lib/constants"

const getStatusColor = (status) => {
  switch (status) {
    case "In Stock":
      return "bg-green-100 text-green-800 border-green-200"
    case "Low Stock":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "Critical":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getStatusIcon = (status) => {
  switch (status) {
    case "In Stock":
      return <CheckCircle className="h-4 w-4" />
    case "Low Stock":
      return <Clock className="h-4 w-4" />
    case "Critical":
      return <AlertTriangle className="h-4 w-4" />
    default:
      return null
  }
}

export default function RawMaterialsDashboard() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredMaterials = rawMaterials.filter(
    (material) =>
      material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white border-b border-orange-200 shadow-sm">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-r from-red-600 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">SM</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                SmoothieMaster
              </h1>
            </div>
          </div>

          <div className="ml-auto flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                placeholder="Search materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64 border border-orange-200 rounded-md px-3 py-2 focus:border-red-400 focus:ring-red-400 focus:outline-none"
              />
            </div>
            <Button size="icon" variant="ghost" className="text-gray-600 hover:text-red-600">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-orange-200 min-h-screen">
          <nav className="p-4 space-y-2">
            <Link
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white"
            >
              <Package className="h-5 w-5" />
              <span className="font-medium">Raw Materials</span>
            </Link>
            <Link
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-orange-100 transition-colors"
            >
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-orange-100 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Orders</span>
            </Link>
            <Link
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-orange-100 transition-colors"
            >
              <Users className="h-5 w-5" />
              <span>Vendors</span>
            </Link>
            <Link
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-orange-100 transition-colors"
            >
              <TrendingUp className="h-5 w-5" />
              <span>Analytics</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Raw Materials Inventory</h2>
                <p className="text-gray-600 mt-1">Manage your smoothie ingredients and suppliers</p>
              </div>
              <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Material
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white border border-orange-200 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-600 mb-2">Total Materials</div>
              <div className="text-2xl font-bold text-gray-900">{rawMaterials.length}</div>
            </div>
            <div className="bg-white border border-orange-200 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-600 mb-2">Low Stock Items</div>
              <div className="text-2xl font-bold text-yellow-600">
                {rawMaterials.filter((m) => m.status === "Low Stock").length}
              </div>
            </div>
            <div className="bg-white border border-orange-200 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-600 mb-2">Critical Items</div>
              <div className="text-2xl font-bold text-red-600">
                {rawMaterials.filter((m) => m.status === "Critical").length}
              </div>
            </div>
            <div className="bg-white border border-orange-200 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-600 mb-2">Total Value</div>
              <div className="text-2xl font-bold text-green-600">
                ${rawMaterials.reduce((sum, m) => sum + m.currentStock * m.costPerUnit, 0).toFixed(2)}
              </div>
            </div>
          </div>

          {/* Materials Table */}
          <div className="bg-white border border-orange-200 rounded-lg">
            <div className="p-6 border-b border-orange-200">
              <h3 className="text-lg font-semibold text-gray-900">Materials Inventory</h3>
              <p className="text-gray-600 mt-1">Track your raw materials, stock levels, and vendor information</p>
            </div>
            <div className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-orange-200">
                    <th className="text-left font-semibold text-gray-700 py-3">Material</th>
                    <th className="text-left font-semibold text-gray-700 py-3">Category</th>
                    <th className="text-left font-semibold text-gray-700 py-3">Current Stock</th>
                    <th className="text-left font-semibold text-gray-700 py-3">Status</th>
                    <th className="text-left font-semibold text-gray-700 py-3">Cost/Unit</th>
                    <th className="text-left font-semibold text-gray-700 py-3">Last Ordered</th>
                    <th className="text-left font-semibold text-gray-700 py-3">Vendors</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMaterials.map((material) => (
                    <tr key={material.id} className="border-b border-orange-100 hover:bg-orange-50/50">
                      <td className="py-3">
                        <div className="font-medium text-gray-900">{material.name}</div>
                      </td>
                      <td className="py-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-orange-300 text-orange-700">
                          {material.category}
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {material.currentStock} {material.unit}
                          </span>
                          <span className="text-xs text-gray-500">
                            Min: {material.minStock} | Max: {material.maxStock}
                          </span>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(material.status)}`}>
                          {getStatusIcon(material.status)}
                          {material.status}
                        </span>
                      </td>
                      <td className="py-3 font-medium">${material.costPerUnit}</td>
                      <td className="py-3 text-gray-600">{material.lastOrdered}</td>
                      <td className="py-3">
                        <div className="relative">
                          <button className="inline-flex items-center px-3 py-1.5 border border-orange-300 text-orange-700 text-sm rounded-md hover:bg-orange-100 hover:border-orange-400 bg-transparent">
                            View Vendors
                            <ChevronDown className="ml-2 h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}