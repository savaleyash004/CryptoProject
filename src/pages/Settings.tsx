import { useState } from "react";
import { User, Bell, Shield, Palette, Globe, Sun, Moon } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    priceAlerts: true,
    newsletter: false,
  });
  const { theme, toggleTheme } = useTheme();

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "preferences", label: "Preferences", icon: Globe },
  ];

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  return (
    <div className="min-h-screen bg-background flex w-full">
      <Sidebar />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden lg:ml-0">
        <Header onRefresh={() => {}} isLoading={false} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-screen-2xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Settings</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Settings Navigation */}
              <div className="lg:col-span-1">
                <div className="rounded-lg border border-border bg-card p-4">
                  <nav className="space-y-2">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                          "w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors",
                          activeTab === tab.id
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        )}
                      >
                        <tab.icon size={16} />
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Settings Content */}
              <div className="lg:col-span-3">
                <div className="rounded-lg border border-border bg-card p-6">
                  {activeTab === "profile" && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold">Profile Settings</h2>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Full Name</label>
                          <input
                            type="text"
                            defaultValue="John Doe"
                            className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Email</label>
                          <input
                            type="email"
                            defaultValue="john.doe@example.com"
                            className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Bio</label>
                          <textarea
                            rows={3}
                            placeholder="Tell us about yourself..."
                            className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  )}

                  {activeTab === "notifications" && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold">Notification Settings</h2>
                      <div className="space-y-4">
                        {Object.entries(notifications).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between">
                            <div>
                              <div className="font-medium capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {key === "email" && "Receive updates via email"}
                                {key === "push" && "Get push notifications on your device"}
                                {key === "priceAlerts" && "Get notified about price changes"}
                                {key === "newsletter" && "Receive our weekly newsletter"}
                              </div>
                            </div>
                            <button
                              onClick={() => handleNotificationChange(key)}
                              className={cn(
                                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                                value ? "bg-primary" : "bg-muted"
                              )}
                            >
                              <span
                                className={cn(
                                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                                  value ? "translate-x-6" : "translate-x-1"
                                )}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "security" && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold">Security Settings</h2>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium mb-2">Change Password</h3>
                          <div className="space-y-3">
                            <input
                              type="password"
                              placeholder="Current password"
                              className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <input
                              type="password"
                              placeholder="New password"
                              className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <input
                              type="password"
                              placeholder="Confirm new password"
                              className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          </div>
                          <button className="mt-3 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                            Update Password
                          </button>
                        </div>
                        <div className="border-t pt-4">
                          <h3 className="font-medium mb-2">Two-Factor Authentication</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            Add an extra layer of security to your account
                          </p>
                          <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                            Enable 2FA
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "appearance" && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold">Appearance Settings</h2>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium mb-2">Theme</h3>
                          <div className="flex items-center gap-4">
                            <button
                              onClick={toggleTheme}
                              className={cn(
                                "flex items-center px-4 py-2 rounded-lg border border-border transition-colors",
                                theme === "dark"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-background text-foreground hover:bg-muted"
                              )}
                            >
                              {theme === "dark" ? <Moon size={18} className="mr-2" /> : <Sun size={18} className="mr-2" />}
                              {theme === "dark" ? "Dark Mode" : "Light Mode"}
                            </button>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">Font Size</h3>
                          <select className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary">
                            <option>Small</option>
                            <option selected>Medium</option>
                            <option>Large</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "preferences" && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold">Preferences</h2>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium mb-2">Default Currency</h3>
                          <select className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary">
                            <option selected>USD ($)</option>
                            <option>EUR (€)</option>
                            <option>GBP (£)</option>
                            <option>BTC (₿)</option>
                          </select>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">Language</h3>
                          <select className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary">
                            <option selected>English</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>German</option>
                          </select>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">Timezone</h3>
                          <select className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary">
                            <option selected>UTC-5 (Eastern Time)</option>
                            <option>UTC-8 (Pacific Time)</option>
                            <option>UTC+0 (GMT)</option>
                            <option>UTC+1 (Central European Time)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
