"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  Filter,
  BarChart3,
  Users,
  Package,
  ShoppingCart,
  Home,
  Settings,
  Bell,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Leaf,
  Globe,
} from "lucide-react"
import Link from "next/link"

import { Button } from "../components/button"
import { vendors } from "../lib/constants"

export default function VendorDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedVendors, setSelectedVendors] = useState([])
  const [showComparison, setShowComparison] = useState(false)
  const [showSustainabilityModal, setShowSustainabilityModal] = useState(false)
  const [selectedVendorForSustainability, setSelectedVendorForSustainability] = useState(null)

  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.materials.some((material) => material.name.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleVendorSelect = (vendorId, checked) => {
    if (checked) {
      setSelectedVendors([...selectedVendors, vendorId])
    } else {
      setSelectedVendors(selectedVendors.filter((id) => id !== vendorId))
    }
  }

  const getComparisonData = () => {
    const selectedVendorData = vendors.filter((v) => selectedVendors.includes(v.id))
    const allMaterials = [...new Set(selectedVendorData.flatMap((v) => v.materials.map((m) => m.name)))]

    return allMaterials.map((material) => {
      const vendorPrices = selectedVendorData.map((vendor) => {
        const vendorMaterial = vendor.materials.find((m) => m.name === material)
        return {
          vendorName: vendor.name,
          price: vendorMaterial?.price || null,
          quality: vendorMaterial?.quality || null,
          availability: vendorMaterial?.availability || null,
        }
      })
      return { material, vendorPrices }
    })
  }

  const handleSustainabilityEvaluation = (vendor) => {
    setSelectedVendorForSustainability(vendor)
    setShowSustainabilityModal(true)
  }

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <div className="hidden border-r border-orange-200 bg-orange-50/40 lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b border-orange-200 px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-red-600 to-orange-500 text-white">
                SM
              </div>
              <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">SmoothieMaster</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8 bg-transparent border-orange-200">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                href="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-orange-600 hover:bg-orange-100"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-orange-600 hover:bg-orange-100"
              >
                <Package className="h-4 w-4" />
                Raw Materials
              </Link>
              <Link
                href="/vendors"
                className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 px-3 py-2 text-white transition-all"
              >
                <Users className="h-4 w-4" />
                Vendors
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-orange-600 hover:bg-orange-100"
              >
                <ShoppingCart className="h-4 w-4" />
                Orders
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-orange-600 hover:bg-orange-100"
              >
                <BarChart3 className="h-4 w-4" />
                Analytics
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-orange-600 hover:bg-orange-100"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col">
        {/* Header */}
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b border-orange-200 bg-orange-50/40 px-6">
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search vendors or materials..."
                  className="w-full bg-white border border-orange-200 rounded-md shadow-none appearance-none pl-8 pr-4 py-2 md:w-2/3 lg:w-1/3 focus:border-red-400 focus:ring-red-400 focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className="flex items-center gap-2">
            {selectedVendors.length > 0 && (
              <Button 
                variant="outline" 
                size="sm"
                className="border-orange-300 text-orange-700 hover:bg-orange-100"
                onClick={() => setShowComparison(true)}
              >
                <Globe className="h-4 w-4 mr-2" />
                Compare ({selectedVendors.length})
              </Button>
            )}
            <Button size="sm" className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Vendor
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-semibold text-lg md:text-2xl text-gray-900">Vendor Management</h1>
              <p className="text-gray-600">Manage your suppliers and compare their offerings</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="border-orange-300 text-orange-700 hover:bg-orange-100">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Vendor Cards */}
          <div className="grid gap-6">
            {filteredVendors.map((vendor) => (
              <div key={vendor.id} className="bg-white rounded-lg border border-orange-200 shadow-sm">
                <div className="p-6 border-b border-orange-100">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        checked={selectedVendors.includes(vendor.id)}
                        onChange={(e) => handleVendorSelect(vendor.id, e.target.checked)}
                        className="h-4 w-4 text-orange-600 border-orange-300 rounded focus:ring-orange-500"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                          {vendor.name}
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            vendor.status === "Active" 
                              ? "bg-green-100 text-green-800 border border-green-200" 
                              : "bg-gray-100 text-gray-800 border border-gray-200"
                          }`}>
                            {vendor.status}
                          </span>
                        </h3>
                        <p className="text-gray-600 mt-1">
                          Contact: {vendor.contact} • {vendor.email} • {vendor.phone}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span>Rating: ⭐ {vendor.rating}</span>
                          <span>Orders: {vendor.totalOrders}</span>
                          <span>Last Order: {vendor.lastOrder}</span>
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <button className="p-2 hover:bg-orange-100 rounded-md">
                        <MoreHorizontal className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-900">Supplied Materials</h4>
                    <div className="border border-orange-200 rounded-lg">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-orange-200">
                            <th className="text-left font-semibold text-gray-700 py-3 px-4">Material</th>
                            <th className="text-left font-semibold text-gray-700 py-3 px-4">Price</th>
                            <th className="text-left font-semibold text-gray-700 py-3 px-4">Quality</th>
                            <th className="text-left font-semibold text-gray-700 py-3 px-4">Availability</th>
                          </tr>
                        </thead>
                        <tbody>
                          {vendor.materials.map((material, index) => (
                            <tr key={index} className="border-b border-orange-100 hover:bg-orange-50/50">
                              <td className="font-medium py-3 px-4">{material.name}</td>
                              <td className="py-3 px-4">
                                ${material.price.toFixed(2)}/{material.unit}
                              </td>
                              <td className="py-3 px-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-orange-300 text-orange-700">
                                  {material.quality}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                  material.availability === "In Stock" 
                                    ? "bg-green-100 text-green-800 border-green-200" 
                                    : "bg-yellow-100 text-yellow-800 border-yellow-200"
                                }`}>
                                  {material.availability}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button 
                        className="bg-gradient-to-r from-green-600 to-blue-500 hover:from-green-700 hover:to-blue-600 text-white"
                        onClick={() => handleSustainabilityEvaluation(vendor)}
                      >
                        <Leaf className="h-4 w-4 mr-2" />
                        Evaluate Vendor Sustainable Practices
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Comparison Modal */}
      {showComparison && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[80vh] overflow-auto">
            <div className="p-6 border-b border-orange-200">
              <h3 className="text-xl font-semibold text-gray-900">Vendor Comparison</h3>
              <p className="text-gray-600 mt-1">Compare materials and pricing across selected vendors</p>
            </div>
            <div className="p-6 space-y-4">
              {getComparisonData().map((item, index) => (
                <div key={index} className="bg-white border border-orange-200 rounded-lg">
                  <div className="p-4 border-b border-orange-200">
                    <h4 className="text-lg font-semibold text-gray-900">{item.material}</h4>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {item.vendorPrices.map((vendor, vIndex) => (
                        <div key={vIndex} className="border border-orange-200 rounded-lg p-4">
                          <h5 className="font-semibold text-gray-900">{vendor.vendorName}</h5>
                          {vendor.price ? (
                            <div className="space-y-1 mt-2">
                              <p className="text-2xl font-bold text-green-600">${vendor.price.toFixed(2)}</p>
                              <p className="text-sm text-gray-500">Quality: {vendor.quality}</p>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                vendor.availability === "In Stock" 
                                  ? "bg-green-100 text-green-800 border-green-200" 
                                  : "bg-yellow-100 text-yellow-800 border-yellow-200"
                              }`}>
                                {vendor.availability}
                              </span>
                            </div>
                          ) : (
                            <p className="text-gray-500 mt-2">Not available</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-orange-200 flex justify-end">
              <Button 
                className="bg-gray-500 hover:bg-gray-600 text-white"
                onClick={() => setShowComparison(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Sustainability Evaluation Modal */}
      {showSustainabilityModal && selectedVendorForSustainability && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Sustainability Evaluation</h3>
            <p className="text-gray-600 mb-4">
              Evaluating sustainable practices for <strong>{selectedVendorForSustainability.name}</strong>
            </p>
            <p className="text-gray-500 text-sm mb-6">
              This feature is coming soon. You'll be able to analyze vendor sustainability practices, 
              environmental impact, and compliance with green standards.
            </p>
            <div className="flex justify-end">
              <Button 
                className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white"
                onClick={() => {
                  setShowSustainabilityModal(false)
                  setSelectedVendorForSustainability(null)
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 