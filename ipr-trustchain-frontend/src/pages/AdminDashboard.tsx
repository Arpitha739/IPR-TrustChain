import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Statistics {
  totalUsers: number;
  totalIPs: number;
  verifiedIPs: number;
  pendingIPs: number;
  totalDocuments: number;
  blockchainRegistered: number;
  totalVerifications: number;
  successfulVerifications: number;
  failedVerifications: number;
  totalAuditLogs: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  country: string;
}

interface IPAsset {
  id: number;
  ipIdentifier: string;
  title: string;
  type: string;
  status: string;
  creatorName: string;
}

interface AuditLog {
  id: number;
  userId: number;
  ipId: number | null;
  action: string;
  description: string;
  timestamp: string;
}

type ActiveSection =
  | "overview"
  | "users"
  | "ip-assets"
  | "audit-logs";

const API_URL = "https://ipr-trustchain-backend.onrender.com/api";

function AdminDashboard() {
  const { token, logout, user } = useAuth();
  const navigate = useNavigate();

  const [statistics, setStatistics] =
    useState<Statistics | null>(null);

  const [users, setUsers] =
    useState<User[]>([]);

  const [ipAssets, setIpAssets] =
    useState<IPAsset[]>([]);

  const [auditLogs, setAuditLogs] =
    useState<AuditLog[]>([]);

  const [activeSection, setActiveSection] =
    useState<ActiveSection>("overview");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadAdminData();
  }, [token]);

  const loadAdminData = async () => {
    if (!token) {
      setError("Authentication token not found.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const [
        statisticsResponse,
        usersResponse,
        ipAssetsResponse,
        auditLogsResponse,
      ] = await Promise.all([
        axios.get<Statistics>(
          `${API_URL}/admin/dashboard/statistics`,
          config
        ),

        axios.get<User[]>(
          `${API_URL}/admin/dashboard/users`,
          config
        ),

        axios.get<IPAsset[]>(
          `${API_URL}/admin/dashboard/ip-assets`,
          config
        ),

        axios.get<AuditLog[]>(
          `${API_URL}/admin/dashboard/audit-logs`,
          config
        ),
      ]);

      console.log(
        "Admin statistics:",
        statisticsResponse.data
      );

      console.log(
        "Admin users:",
        usersResponse.data
      );

      console.log(
        "Admin IP assets:",
        ipAssetsResponse.data
      );

      console.log(
        "Admin audit logs:",
        auditLogsResponse.data
      );

      setStatistics(statisticsResponse.data);
      setUsers(usersResponse.data);
      setIpAssets(ipAssetsResponse.data);
      setAuditLogs(auditLogsResponse.data);

    } catch (error: any) {

      console.error(
        "Failed to load admin dashboard:",
        error
      );

      if (error.response?.status === 401) {
        setError(
          "Your session is invalid or expired. Please log in again."
        );
      } else if (error.response?.status === 403) {
        setError(
          "You do not have permission to access the Admin Dashboard."
        );
      } else {
        setError(
          error.response?.data?.message ||
          "Failed to load admin dashboard data."
        );
      }

    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">

          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />

          <p className="text-white text-lg">
            Loading Admin Dashboard...
          </p>

        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6">

        <div className="max-w-md w-full bg-slate-900 border border-red-500/30 rounded-2xl p-8 text-center shadow-2xl">

          <div className="text-4xl mb-4">
            ⚠️
          </div>

          <h2 className="text-2xl font-bold text-red-400 mb-3">
            Admin Dashboard Error
          </h2>

          <p className="text-slate-400 mb-6">
            {error}
          </p>

          <div className="flex gap-3 justify-center">

            <button
              onClick={loadAdminData}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition"
            >
              Retry
            </button>

            <button
              onClick={handleLogout}
              className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-3 rounded-lg transition"
            >
              Logout
            </button>

          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* SIDEBAR */}

      <aside className="w-64 bg-slate-950 text-white min-h-screen flex flex-col border-r border-slate-800">

        <div className="p-6 border-b border-slate-800">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-xl">
              ⛓️
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-wide">
                IPR TrustChain
              </h1>

              <p className="text-slate-400 text-xs mt-1">
                Admin Control Center
              </p>
            </div>

          </div>

        </div>


        <nav className="flex-1 p-4 space-y-2">

          <p className="text-xs uppercase tracking-wider text-slate-500 px-4 mb-3">
            Management
          </p>

          <SidebarButton
            label="Overview"
            icon="📊"
            active={activeSection === "overview"}
            onClick={() =>
              setActiveSection("overview")
            }
          />

          <SidebarButton
            label="Users"
            icon="👥"
            active={activeSection === "users"}
            onClick={() =>
              setActiveSection("users")
            }
          />

          <SidebarButton
            label="IP Assets"
            icon="📄"
            active={activeSection === "ip-assets"}
            onClick={() =>
              setActiveSection("ip-assets")
            }
          />

          <SidebarButton
            label="Audit Logs"
            icon="📋"
            active={activeSection === "audit-logs"}
            onClick={() =>
              setActiveSection("audit-logs")
            }
          />

        </nav>


        <div className="p-4 border-t border-slate-800">

          <div className="mb-4 px-3">

            <p className="text-xs text-slate-500">
              Logged in as
            </p>

            <p className="text-sm text-white font-medium truncate">
              {user?.name || "Administrator"}
            </p>

            <p className="text-xs text-blue-400">
              ADMIN
            </p>

          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white py-3 rounded-lg transition font-medium"
          >
            Logout
          </button>

        </div>

      </aside>


      {/* MAIN CONTENT */}

      <main className="flex-1 overflow-auto">

        {/* HEADER */}

        <div className="bg-white border-b border-slate-200 px-8 py-6 sticky top-0 z-10">

          <h2 className="text-2xl font-bold text-slate-800">

            {activeSection === "overview" &&
              "Admin Dashboard"}

            {activeSection === "users" &&
              "User Management"}

            {activeSection === "ip-assets" &&
              "Intellectual Property Assets"}

            {activeSection === "audit-logs" &&
              "System Audit Logs"}

          </h2>

          <p className="text-slate-500 mt-1">

            {activeSection === "overview" &&
              "Monitor platform activity and system statistics"}

            {activeSection === "users" &&
              "View all registered platform users"}

            {activeSection === "ip-assets" &&
              "Monitor registered intellectual property assets"}

            {activeSection === "audit-logs" &&
              "Track system activity and security events"}

          </p>

        </div>


        <div className="p-8">

          {/* OVERVIEW */}

          {activeSection === "overview" && (

            <div className="space-y-8">

              {/* MAIN STATS */}

              <section>

                <h3 className="text-lg font-semibold text-slate-700 mb-4">
                  Platform Overview
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

                  <StatCard
                    title="Total Users"
                    value={statistics?.totalUsers}
                    icon="👥"
                    color="blue"
                  />

                  <StatCard
                    title="IP Assets"
                    value={statistics?.totalIPs}
                    icon="📄"
                    color="purple"
                  />

                  <StatCard
                    title="Documents"
                    value={statistics?.totalDocuments}
                    icon="📁"
                    color="orange"
                  />

                  <StatCard
                    title="Blockchain Records"
                    value={statistics?.blockchainRegistered}
                    icon="⛓️"
                    color="green"
                  />

                </div>

              </section>


              {/* VERIFICATION STATS */}

              <section>

                <h3 className="text-lg font-semibold text-slate-700 mb-4">
                  Verification Statistics
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

                  <StatCard
                    title="Total Verifications"
                    value={statistics?.totalVerifications}
                    icon="🔍"
                    color="blue"
                  />

                  <StatCard
                    title="Successful"
                    value={statistics?.successfulVerifications}
                    icon="✓"
                    color="green"
                  />

                  <StatCard
                    title="Failed"
                    value={statistics?.failedVerifications}
                    icon="✕"
                    color="red"
                  />

                  <StatCard
                    title="Audit Logs"
                    value={statistics?.totalAuditLogs}
                    icon="📋"
                    color="purple"
                  />

                </div>

              </section>


              {/* IP STATUS */}

              <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">

                <h3 className="text-lg font-semibold text-slate-800 mb-6">
                  IP Asset Status
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                  <StatusBox
                    title="Total IP Assets"
                    value={statistics?.totalIPs}
                    description="All registered intellectual property assets"
                    color="blue"
                  />

                  <StatusBox
                    title="Verified IPs"
                    value={statistics?.verifiedIPs}
                    description="Successfully verified assets"
                    color="green"
                  />

                  <StatusBox
                    title="Pending IPs"
                    value={statistics?.pendingIPs}
                    description="Assets awaiting verification"
                    color="orange"
                  />

                </div>

              </section>

            </div>

          )}


          {/* USERS */}

          {activeSection === "users" && (

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead className="bg-slate-50 border-b border-slate-200">

                    <tr>
                      <TableHeader>ID</TableHeader>
                      <TableHeader>Name</TableHeader>
                      <TableHeader>Email</TableHeader>
                      <TableHeader>Role</TableHeader>
                      <TableHeader>Country</TableHeader>
                    </tr>

                  </thead>

                  <tbody>

                    {users.length === 0 ? (

                      <EmptyRow
                        colSpan={5}
                        message="No users found"
                      />

                    ) : (

                      users.map((user) => (

                        <tr
                          key={user.id}
                          className="border-b border-slate-100 hover:bg-slate-50 transition"
                        >

                          <TableCell>
                            #{user.id}
                          </TableCell>

                          <TableCell>
                            <span className="font-medium">
                              {user.name}
                            </span>
                          </TableCell>

                          <TableCell>
                            {user.email}
                          </TableCell>

                          <TableCell>
                            <RoleBadge role={user.role} />
                          </TableCell>

                          <TableCell>
                            {user.country || "-"}
                          </TableCell>

                        </tr>

                      ))

                    )}

                  </tbody>

                </table>

              </div>

            </div>

          )}


          {/* IP ASSETS */}

          {activeSection === "ip-assets" && (

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead className="bg-slate-50 border-b border-slate-200">

                    <tr>
                      <TableHeader>IP Identifier</TableHeader>
                      <TableHeader>Title</TableHeader>
                      <TableHeader>Type</TableHeader>
                      <TableHeader>Status</TableHeader>
                      <TableHeader>Creator</TableHeader>
                    </tr>

                  </thead>

                  <tbody>

                    {ipAssets.length === 0 ? (

                      <EmptyRow
                        colSpan={5}
                        message="No IP assets found"
                      />

                    ) : (

                      ipAssets.map((ip) => (

                        <tr
                          key={ip.id}
                          className="border-b border-slate-100 hover:bg-slate-50 transition"
                        >

                          <TableCell>

                            <span className="font-medium text-blue-600">
                              {ip.ipIdentifier}
                            </span>

                          </TableCell>

                          <TableCell>
                            {ip.title}
                          </TableCell>

                          <TableCell>
                            {ip.type}
                          </TableCell>

                          <TableCell>
                            <StatusBadge status={ip.status} />
                          </TableCell>

                          <TableCell>
                            {ip.creatorName}
                          </TableCell>

                        </tr>

                      ))

                    )}

                  </tbody>

                </table>

              </div>

            </div>

          )}


          {/* AUDIT LOGS */}

          {activeSection === "audit-logs" && (

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead className="bg-slate-50 border-b border-slate-200">

                    <tr>
                      <TableHeader>Time</TableHeader>
                      <TableHeader>User ID</TableHeader>
                      <TableHeader>IP ID</TableHeader>
                      <TableHeader>Action</TableHeader>
                      <TableHeader>Description</TableHeader>
                    </tr>

                  </thead>

                  <tbody>

                    {auditLogs.length === 0 ? (

                      <EmptyRow
                        colSpan={5}
                        message="No audit logs found"
                      />

                    ) : (

                      auditLogs.map((log) => (

                        <tr
                          key={log.id}
                          className="border-b border-slate-100 hover:bg-slate-50 transition"
                        >

                          <TableCell>

                            {log.timestamp
                              ? new Date(
                                  log.timestamp
                                ).toLocaleString()
                              : "-"}

                          </TableCell>

                          <TableCell>
                            #{log.userId}
                          </TableCell>

                          <TableCell>
                            {log.ipId ?? "-"}
                          </TableCell>

                          <TableCell>

                            <ActionBadge
                              action={log.action}
                            />

                          </TableCell>

                          <TableCell>
                            <span className="max-w-md block">
                              {log.description}
                            </span>
                          </TableCell>

                        </tr>

                      ))

                    )}

                  </tbody>

                </table>

              </div>

            </div>

          )}

        </div>

      </main>

    </div>
  );
}


/* =========================
   SIDEBAR BUTTON
========================= */

interface SidebarButtonProps {
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}

function SidebarButton({
  label,
  icon,
  active,
  onClick,
}: SidebarButtonProps) {

  return (

    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
        active
          ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30"
          : "text-slate-400 hover:bg-slate-900 hover:text-white"
      }`}
    >

      <span>{icon}</span>

      {label}

    </button>

  );
}


/* =========================
   STAT CARD
========================= */

interface StatCardProps {
  title: string;
  value: number | undefined;
  icon: string;
  color: string;
}

function StatCard({
  title,
  value,
  icon,
  color,
}: StatCardProps) {

  const colorClasses: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
    red: "bg-red-50 text-red-600",
  };

  return (

    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3 className="text-3xl font-bold text-slate-800 mt-3">
            {value ?? 0}
          </h3>

        </div>

        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
            colorClasses[color]
          }`}
        >
          {icon}
        </div>

      </div>

    </div>

  );
}


/* =========================
   STATUS BOX
========================= */

interface StatusBoxProps {
  title: string;
  value: number | undefined;
  description: string;
  color: string;
}

function StatusBox({
  title,
  value,
  description,
  color,
}: StatusBoxProps) {

  const colors: Record<string, string> = {
    blue: "border-blue-500",
    green: "border-green-500",
    orange: "border-orange-500",
  };

  return (

    <div
      className={`border-l-4 ${colors[color]} bg-slate-50 rounded-lg p-5`}
    >

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h3 className="text-3xl font-bold text-slate-800 mt-2">
        {value ?? 0}
      </h3>

      <p className="text-sm text-slate-400 mt-2">
        {description}
      </p>

    </div>

  );
}


/* =========================
   TABLE COMPONENTS
========================= */

function TableHeader({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
      {children}
    </th>

  );
}


function TableCell({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <td className="px-6 py-4 text-sm text-slate-700">
      {children}
    </td>

  );
}


function EmptyRow({
  colSpan,
  message,
}: {
  colSpan: number;
  message: string;
}) {

  return (

    <tr>

      <td
        colSpan={colSpan}
        className="px-6 py-12 text-center text-slate-400"
      >
        {message}
      </td>

    </tr>

  );
}


/* =========================
   ROLE BADGE
========================= */

function RoleBadge({
  role,
}: {
  role: string;
}) {

  const roleStyles: Record<string, string> = {
    ADMIN: "bg-purple-100 text-purple-700",
    CREATOR: "bg-blue-100 text-blue-700",
    VERIFIER: "bg-green-100 text-green-700",
  };

  return (

    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        roleStyles[role] ||
        "bg-slate-100 text-slate-600"
      }`}
    >
      {role}
    </span>

  );
}


/* =========================
   IP STATUS BADGE
========================= */

function StatusBadge({
  status,
}: {
  status: string;
}) {

  const statusStyles: Record<string, string> = {
    VERIFIED: "bg-green-100 text-green-700",
    PENDING: "bg-orange-100 text-orange-700",
    REJECTED: "bg-red-100 text-red-700",
  };

  return (

    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        statusStyles[status] ||
        "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>

  );
}


/* =========================
   AUDIT ACTION BADGE
========================= */

function ActionBadge({
  action,
}: {
  action: string;
}) {

  let style =
    "bg-blue-50 text-blue-700 border-blue-100";

  if (action.includes("FAILED")) {
    style =
      "bg-red-50 text-red-700 border-red-100";
  }

  if (action.includes("SUCCESS")) {
    style =
      "bg-green-50 text-green-700 border-green-100";
  }

  if (action.includes("LOGIN")) {
    style =
      "bg-purple-50 text-purple-700 border-purple-100";
  }

  return (

    <span
      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${style}`}
    >
      {action}
    </span>

  );
}


export default AdminDashboard;