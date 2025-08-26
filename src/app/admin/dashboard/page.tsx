"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// Temporarily simplified admin dashboard without CMS auth
export default function CMSDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "overview" | "concepts" | "team" | "settings"
  >("overview");

  // Simplified authentication check
  const isAuthenticated = true; // Temporary for development
  const isLoading = false;
  const user = { name: "Admin" }; // Temporary user data
  const logout = () => router.push("/admin/login");

  // Temporary analytics type and state
  type TempAnalytics = {
    totalConcepts: number;
    totalTeam: number;
    totalTeamMembers: number;
    totalViews: number;
    recentActivity: any[];
  };

  const [analytics, setAnalytics] = useState<TempAnalytics | null>(null);

  // Load analytics
  useEffect(() => {
    if (isAuthenticated) {
      // Temporary analytics data
      setAnalytics({
        totalConcepts: 0,
        totalTeam: 0,
        totalTeamMembers: 0,
        totalViews: 0,
        recentActivity: [],
      });
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-white">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-white">
                  199S Studio CMS
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Xin chào, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: "overview", label: "Tổng quan", icon: "📊" },
              { id: "concepts", label: "Concepts", icon: "🖼️" },
              { id: "team", label: "Team", icon: "👥" },
              { id: "settings", label: "Cài đặt", icon: "⚙️" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-gray-300 hover:text-gray-200 hover:border-gray-300"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">
              Tổng quan hệ thống
            </h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-lg">🖼️</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-300">
                      Tổng Concepts
                    </p>
                    <p className="text-2xl font-semibold text-white">
                      {analytics?.totalConcepts || 0}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-lg">👥</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-300">
                      Team Members
                    </p>
                    <p className="text-2xl font-semibold text-white">
                      {analytics?.totalTeamMembers || 0}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-lg">👁️</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-300">
                      Tổng lượt xem
                    </p>
                    <p className="text-2xl font-semibold text-white">
                      {analytics?.totalViews || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-4">
                Thao tác nhanh
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveTab("concepts")}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg text-center transition-colors"
                >
                  <div className="text-2xl mb-2">➕</div>
                  <div className="font-medium">Thêm Concept mới</div>
                </button>

                <button
                  onClick={() => setActiveTab("team")}
                  className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg text-center transition-colors"
                >
                  <div className="text-2xl mb-2">👤</div>
                  <div className="font-medium">Thêm Team Member</div>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-4">
                Hoạt động gần đây
              </h3>
              {analytics?.recentActivity &&
              analytics.recentActivity.length > 0 ? (
                <div className="space-y-3">
                  {analytics.recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 text-sm"
                    >
                      <span className="text-gray-400">
                        {activity.type === "concept" ? "🖼️" : "👥"}
                      </span>
                      <span className="text-gray-300">
                        {activity.action === "created"
                          ? "Tạo mới"
                          : activity.action === "updated"
                          ? "Cập nhật"
                          : "Xóa"}
                      </span>
                      <span className="text-white font-medium">
                        {activity.title}
                      </span>
                      <span className="text-gray-500">
                        {new Date(activity.timestamp).toLocaleDateString(
                          "vi-VN"
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">Chưa có hoạt động nào</p>
              )}
            </div>
          </div>
        )}

        {/* Concepts Tab */}
        {activeTab === "concepts" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">
                Quản lý Concepts
              </h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                ➕ Thêm Concept mới
              </button>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <p className="text-gray-300">
                Danh sách concepts sẽ hiển thị ở đây...
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Tính năng đang được phát triển
              </p>
            </div>
          </div>
        )}

        {/* Team Tab */}
        {activeTab === "team" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Quản lý Team</h2>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                👤 Thêm Member mới
              </button>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <p className="text-gray-300">
                Danh sách team members sẽ hiển thị ở đây...
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Tính năng đang được phát triển
              </p>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Cài đặt hệ thống</h2>

            <div className="bg-gray-800 rounded-lg p-6">
              <p className="text-gray-300">
                Cài đặt website sẽ hiển thị ở đây...
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Tính năng đang được phát triển
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
