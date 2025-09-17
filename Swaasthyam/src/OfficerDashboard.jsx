import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "./LoadingAnimation";

/*
  OfficerDashboard.jsx
  - Sidebar: vertical gradient (blue -> black). Active nav goes white with slight opacity.
  - Top actions: Add Health Log, Voice Log, Register new worker (navigates to WorkerRegistration.jsx).
  - Home: Supervisor dashboard metrics + emergency alerts.
  - Workers: searchable list + status pills + "View" modal with full details.
  - Health / Help: "Content coming soon".
  TailwindCSS assumed available globally.
*/

const navItems = [
  { key: "home", label: "Home", icon: HomeIcon },
  { key: "workers", label: "Workers", icon: UsersIcon },
  { key: "health", label: "Health", icon: HeartIcon },
  { key: "help", label: "Help", icon: HelpIcon },
];

export default function OfficerDashboard() {
  const navigate = useNavigate();
  const [active, setActive] = useState("home");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewing, setViewing] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Sample data mirrored from the mockups
  const workers = useMemo(
    () => [
      {
        name: "Rajesh Kumar",
        qrId: "SW-2024-KL-001234",
        status: "Fit",
        lastCheckup: "2024-09-10",
        demographics: {
          gender: "Male",
          dob: "1990-03-14",
          phone: "+91 98765 43100",
        },
        employment: {
          employer: "Coastal Constructions",
          job: "Mason",
          location: "Kochi, Ernakulam",
          supervisor: "Anil Varma",
        },
        health: {
          bloodGroup: "B+",
          height: "170 cm",
          weight: "68 kg",
          allergies: "None",
          chronic: "None",
          meds: "None",
          notes: "Routine checkup normal",
        },
      },
      {
        name: "Suresh Nair",
        qrId: "SW-2024-KL-001235",
        status: "Needs Attention",
        lastCheckup: "2024-09-08",
        demographics: {
          gender: "Male",
          dob: "1988-06-02",
          phone: "+91 98765 43101",
        },
        employment: {
          employer: "Delta Infra",
          job: "Welder",
          location: "Kollam",
          supervisor: "Officer Desk",
        },
        health: {
          bloodGroup: "O+",
          height: "168 cm",
          weight: "65 kg",
          allergies: "Dust",
          chronic: "Intermittent fever",
          meds: "Paracetamol 500mg prn",
          notes: "High fever detected on 2024-09-13",
        },
      },
      {
        name: "Ramesh Pillai",
        qrId: "SW-2024-KL-001236",
        status: "Pending Review",
        lastCheckup: "2024-09-12",
        demographics: {
          gender: "Male",
          dob: "1992-01-21",
          phone: "+91 98765 43102",
        },
        employment: {
          employer: "Metro Works",
          job: "Helper",
          location: "Thiruvananthapuram",
          supervisor: "Officer Desk",
        },
        health: {
          bloodGroup: "A+",
          height: "172 cm",
          weight: "72 kg",
          allergies: "None",
          chronic: "Hypertension (borderline)",
          meds: "Amlodipine 5mg",
          notes: "BP monitoring required",
        },
      },
      {
        name: "Anil Varma",
        qrId: "SW-2024-KL-001237",
        status: "Fit",
        lastCheckup: "2024-09-11",
        demographics: {
          gender: "Male",
          dob: "1994-11-05",
          phone: "+91 98765 43103",
        },
        employment: {
          employer: "Coastal Constructions",
          job: "Supervisor",
          location: "Kochi, Ernakulam",
          supervisor: "Regional Office",
        },
        health: {
          bloodGroup: "AB+",
          height: "175 cm",
          weight: "70 kg",
          allergies: "None",
          chronic: "None",
          meds: "None",
          notes: "Fit for duty",
        },
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    return workers.filter((w) => {
      const byQuery =
        !query ||
        w.name.toLowerCase().includes(query.toLowerCase()) ||
        w.qrId.toLowerCase().includes(query.toLowerCase());
      const byStatus =
        statusFilter === "All" ? true : w.status === statusFilter;
      return byQuery && byStatus;
    });
  }, [workers, query, statusFilter]);

  const totalWorkers = workers.length;
  const activeWorkers = workers.filter((w) => w.status === "Fit").length;
  const pending = workers.filter((w) => w.status === "Pending Review").length;
  const highRisk = workers.filter((w) => w.status === "Needs Attention").length;

  const handleRegisterWorker = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/register-worker");
      setIsLoading(false);
    }, 500);
  };

  const handleAddHealthLog = () => {
    alert("Add Health Log: coming soon.");
  };
  
  const handleVoiceLog = () => {
    alert("Voice Log: coming soon.");
  };
  
  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      // Clear any authentication data here if needed
      // localStorage.removeItem('authToken'); // example
      navigate('/login');
      setIsLoading(false);
    }, 800);
  };

  if (isLoading) {
    return <LoadingAnimation message="Processing..." />;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-[Quicksand] text-gray-900">
      {/* Mobile Header */}
      <div className="md:hidden bg-gradient-to-r from-blue-700 to-black text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img
              src="/Cooked-Coders/assets/logo 2.png"
              alt="Swaasthyam Logo"
              className="h-9 w-9 object-contain"
            />
            <div>
              <p className="text-sm leading-tight font-semibold">Swaasthyam</p>
              <p className="text-[11px] opacity-80">Officer</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs px-3 py-2 rounded-md bg-red-600/90 hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <nav className="flex space-x-1 overflow-x-auto">
          {navItems.map(({ key, label, icon: Icon }) => {
            const isActive = active === key;
            return (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={[
                  "flex items-center gap-2 px-3 py-2 rounded-md transition whitespace-nowrap text-sm",
                  isActive
                    ? "bg-white/20 text-white"
                    : "text-white/90 hover:bg-white/10",
                ].join(" ")}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="h-4 w-4 opacity-90" />
                <span>{label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 text-white bg-gradient-to-b from-blue-700 to-black flex-col">
        <div className="px-4 py-5 flex items-center gap-3">
          <img
            src="/Cooked-Coders/assets/logo 2.png"
            alt="Swaasthyam Logo"
            className="h-9 w-9 object-contain rounded-md bg-white/20 p-1"
          />
          <div>
            <p className="text-sm leading-tight font-semibold">Swaasthyam</p>
            <p className="text-[11px] opacity-80">Officer</p>
          </div>
        </div>

        <nav className="px-2 pt-2 space-y-1">
          {navItems.map(({ key, label, icon: Icon }) => {
            const isActive = active === key;
            return (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={[
                  "w-full flex items-center gap-3 px-3 py-2 rounded-md transition",
                  isActive
                    ? "bg-white/20 text-white"
                    : "text-white/90 hover:bg-white/10",
                ].join(" ")}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="h-5 w-5 opacity-90" />
                <span className="text-sm">{label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto px-4 py-4">
          <button
            onClick={handleLogout}
            className="w-full text-left text-xs px-3 py-2 rounded-md bg-red-600/90 hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main area */}
      <main className="flex-1 bg-gray-50">
        {/* Top bar actions only on Workers page */}
        <div className="flex flex-col md:flex-row md:items-center justify-between px-4 md:px-6 py-4 border-b bg-white gap-4">
          <h1 className="text-xl font-semibold">
            {active === "home" && "Supervisor Dashboard"}
            {active === "workers" && "My Workers"}
            {active === "health" && "Health"}
            {active === "help" && "Help"}
          </h1>

          {active === "workers" && (
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-3">
              <button
                onClick={handleAddHealthLog}
                className="inline-flex items-center justify-center gap-2 px-3 h-9 rounded-md bg-indigo-700 text-white hover:bg-indigo-800 transition text-sm"
              >
                <PlusIcon className="h-4 w-4" /> 
                <span className="hidden md:inline">Add Health Log</span>
                <span className="md:hidden">Add Log</span>
              </button>
              <button
                onClick={handleVoiceLog}
                className="inline-flex items-center justify-center gap-2 px-3 h-9 rounded-md border border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100 transition text-sm"
              >
                <MicIcon className="h-4 w-4" /> 
                <span className="hidden md:inline">Voice Log</span>
                <span className="md:hidden">Voice</span>
              </button>
              <button
                onClick={handleRegisterWorker}
                className="inline-flex items-center justify-center gap-2 px-3 h-9 rounded-md bg-indigo-700 text-white hover:bg-indigo-800 transition text-sm"
              >
                <PlusIcon className="h-4 w-4" /> 
                <span className="hidden md:inline">Register new worker</span>
                <span className="md:hidden">Register</span>
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        {active === "home" && (
          <div className="p-4 md:p-6 space-y-6">
            {/* Metric cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Workers"
                value={totalWorkers}
                icon={UsersIcon}
              />
              <StatCard
                title="Active Workers"
                value={activeWorkers}
                icon={ActiveIcon}
              />
              <StatCard title="Pending Reviews" value={pending} icon={Clock} />
              <StatCard
                title="High Risk Workers"
                value={highRisk}
                icon={AlertTriangle}
              />
            </div>

            {/* Emergency Alerts */}
            <section className="border-2 border-red-200 rounded-lg bg-white">
              <div className="px-5 py-3 border-b flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <p className="font-semibold text-red-700">Emergency Alerts</p>
                {highRisk > 0 && (
                  <span className="ml-auto text-xs bg-red-600 text-white px-2 py-0.5 rounded">
                    {highRisk} Critical
                  </span>
                )}
              </div>

              <div className="p-4 space-y-3">
                {/* High Risk */}
                <AlertRow
                  level="High Risk"
                  name="Suresh Nair"
                  message="High fever detected — requires immediate medical attention"
                  date="2024-09-13"
                  cta="Immediate Action"
                />
                {/* Medium Risk */}
                <AlertRow
                  level="Medium Risk"
                  name="Ramesh Pillai"
                  message="Blood pressure monitoring required"
                  date="2024-09-12"
                />
              </div>
            </section>
          </div>
        )}

        {active === "workers" && (
          <div className="p-4 md:p-6 space-y-6">
            {/* Search + Filter */}
            <div className="flex flex-col md:flex-row gap-3 md:items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  className="w-full h-10 rounded-md border border-gray-300 pl-9 pr-3 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search workers by name or QR ID..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <SearchIcon className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <div>
                <select
                  className="h-10 rounded-md border border-gray-300 px-3 outline-none focus:ring-2 focus:ring-blue-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option>All</option>
                  <option>Fit</option>
                  <option>Needs Attention</option>
                  <option>Pending Review</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden border rounded-lg bg-white">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr className="text-left">
                    <Th>Name</Th>
                    <Th>QR ID</Th>
                    <Th>Status</Th>
                    <Th>Last Check-up</Th>
                    <Th className="text-right pr-4">Actions</Th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((w) => (
                    <tr
                      key={w.qrId}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <Td>{w.name}</Td>
                      <Td className="font-mono">{w.qrId}</Td>
                      <Td>
                        <StatusPill status={w.status} />
                      </Td>
                      <Td>{w.lastCheckup}</Td>
                      <Td className="text-right pr-4">
                        <button
                          onClick={() => setViewing(w)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border text-gray-700 hover:bg-gray-100 transition"
                          aria-label={`View ${w.name}`}
                        >
                          <EyeIcon className="h-4 w-4" />
                          View
                        </button>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Support cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border bg-green-50 p-4">
                <p className="font-semibold text-green-800">
                  Healthcare Support & Resources
                </p>
                <div className="mt-3 rounded-lg border bg-white p-4">
                  <p className="font-semibold text-green-700">
                    Emergency Support
                  </p>
                  <p className="text-sm mt-1 opacity-80">
                    24/7 Healthcare Helpline
                  </p>
                  <p className="mt-2 text-blue-700 font-semibold">
                    +91 1800-425-1425
                  </p>
                </div>
              </div>
              <div className="rounded-lg border bg-blue-50 p-4">
                <p className="font-semibold text-blue-800">Technical Support</p>
                <div className="mt-3 rounded-lg border bg-white p-4">
                  <p className="text-sm opacity-80">Platform & Data Issues</p>
                  <p className="mt-2 text-blue-700 font-semibold">
                    support@swaasthyam.kerala.gov.in
                  </p>
                </div>
              </div>
            </div>

            {/* Worker detail modal */}
            {viewing && (
              <DetailModal worker={viewing} onClose={() => setViewing(null)} />
            )}
          </div>
        )}

        {active === "health" && (
          <EmptyCenter text="health section - Content coming soon" />
        )}

        {active === "help" && (
          <EmptyCenter text="help section - Content coming soon" />
        )}
      </main>
    </div>
  );
}

/* ---------- Small UI helpers ---------- */

function Th({ children, className = "" }) {
  return (
    <th
      className={[
        "px-4 py-3 text-xs font-semibold text-gray-600",
        className,
      ].join(" ")}
    >
      {children}
    </th>
  );
}
function Td({ children, className = "" }) {
  return (
    <td className={["px-4 py-3 align-top", className].join(" ")}>{children}</td>
  );
}

function StatusPill({ status }) {
  const map = {
    Fit: "bg-green-100 text-green-700",
    "Needs Attention": "bg-red-100 text-red-700",
    "Pending Review": "bg-orange-100 text-orange-700",
  };
  return (
    <span
      className={[
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs",
        map[status] || "bg-gray-100 text-gray-700",
      ].join(" ")}
    >
      {status}
    </span>
  );
}

function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="rounded-lg border bg-white p-4 flex items-center gap-3">
      <div className="h-10 w-10 rounded-md bg-blue-50 grid place-items-center">
        <Icon className="h-5 w-5 text-blue-700" />
      </div>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}

function AlertRow({ level, name, message, date, cta }) {
  const isHigh = level.includes("High");
  return (
    <div
      className={[
        "rounded-lg border p-4",
        isHigh ? "bg-red-50 border-red-200" : "bg-yellow-50 border-yellow-200",
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <AlertTriangle
          className={[
            "h-5 w-5 mt-0.5",
            isHigh ? "text-red-600" : "text-yellow-600",
          ].join(" ")}
        />
        <div className="flex-1">
          <p className="font-semibold">{name}</p>
          <p className="text-sm opacity-80">{message}</p>
          <p className="text-xs text-blue-700 mt-1">{date}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span
            className={[
              "text-xs px-2 py-0.5 rounded",
              isHigh
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700",
            ].join(" ")}
          >
            {level}
          </span>
          {cta && (
            <button className="text-xs px-3 py-1 rounded bg-red-700 text-white hover:bg-red-800">
              {cta}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailModal({ worker, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 grid place-items-center px-4">
      <div className="w-full max-w-3xl rounded-lg bg-white shadow-2xl overflow-hidden">
        <div className="px-5 py-3 border-b flex items-center justify-between">
          <p className="font-semibold">Worker Details</p>
          <button
            onClick={onClose}
            className="h-8 w-8 grid place-items-center rounded-md hover:bg-gray-100"
            aria-label="Close"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Header */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-blue-100 grid place-items-center">
              <UserIcon className="h-6 w-6 text-blue-700" />
            </div>
            <div>
              <p className="text-lg font-semibold">{worker.name}</p>
              <p className="text-sm font-mono text-gray-600">{worker.qrId}</p>
            </div>
            <div className="ml-auto">
              <StatusPill status={worker.status} />
            </div>
          </div>

          {/* Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card title="Demographics">
              <Info label="Gender" value={worker.demographics.gender} />
              <Info label="Date of Birth" value={worker.demographics.dob} />
              <Info label="Phone" value={worker.demographics.phone} />
              <Info label="Last Check-up" value={worker.lastCheckup} />
            </Card>

            <Card title="Employment">
              <Info label="Employer" value={worker.employment.employer} />
              <Info label="Job Category" value={worker.employment.job} />
              <Info label="Work Location" value={worker.employment.location} />
              <Info label="Supervisor" value={worker.employment.supervisor} />
            </Card>

            <Card title="Health">
              <Info label="Blood Group" value={worker.health.bloodGroup} />
              <Info label="Height" value={worker.health.height} />
              <Info label="Weight" value={worker.health.weight} />
              <Info label="Allergies" value={worker.health.allergies} />
              <Info label="Chronic Conditions" value={worker.health.chronic} />
              <Info label="Medications" value={worker.health.meds} />
            </Card>

            <Card title="Notes">
              <p className="text-sm text-gray-700">{worker.health.notes}</p>
            </Card>
          </div>
        </div>

        <div className="px-5 py-3 border-t bg-gray-50 flex justify-end gap-3">
          <button className="px-3 h-9 rounded-md border hover:bg-white">
            Add Health Log
          </button>
          <button className="px-3 h-9 rounded-md border hover:bg-white">
            Voice Log
          </button>
          <button
            onClick={onClose}
            className="px-3 h-9 rounded-md bg-blue-700 text-white hover:bg-blue-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="rounded-lg border bg-white p-4">
      <p className="font-semibold mb-2">{title}</p>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <p className="text-sm">
      <span className="text-gray-500">{label}:</span>{" "}
      <span className="font-medium">{value || "—"}</span>
    </p>
  );
}

function EmptyCenter({ text }) {
  return (
    <div className="grid place-items-center h-[70vh] text-gray-600">
      <p>{text}</p>
    </div>
  );
}

/* ---------- Icons (inline SVG) ---------- */
function IconBase({ className = "", children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className={className}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function HomeIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M3 10.5L12 3l9 7.5" />
      <path d="M5 10v10h14V10" />
    </IconBase>
  );
}
function UsersIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="3" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </IconBase>
  );
}
function HeartIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
    </IconBase>
  );
}
function HelpIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M9.1 9a3 3 0 1 1 5.8 1c0 2-3 2.5-3 4" />
      <line x1="12" y1="17.5" x2="12" y2="17.6" />
      <circle cx="12" cy="12" r="10" />
    </IconBase>
  );
}
function ActiveIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M20 6L9 17l-5-5" />
    </IconBase>
  );
}
function Clock(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </IconBase>
  );
}
function AlertTriangle(props) {
  return (
    <IconBase {...props}>
      <path d="M10.3 3.3 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.3a2 2 0 0 0-3.4 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </IconBase>
  );
}
function PlusIcon(props) {
  return (
    <IconBase {...props}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </IconBase>
  );
}
function MicIcon(props) {
  return (
    <IconBase {...props}>
      <rect x="9" y="3" width="6" height="10" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <line x1="8" y1="21" x2="16" y2="21" />
    </IconBase>
  );
}
function SearchIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </IconBase>
  );
}
function EyeIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
      <circle cx="12" cy="12" r="3" />
    </IconBase>
  );
}
function CloseIcon(props) {
  return (
    <IconBase {...props}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </IconBase>
  );
}
function UserIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M20 21a8 8 0 1 0-16 0" />
    </IconBase>
  );
}
function HeartMini(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={props.className || "h-5 w-5"}
      fill="currentColor"
    >
      <path d="M12.1 21.3 3 12.2a6 6 0 0 1 8.5-8.5l.6.6.6-.6a6 6 0 1 1 8.5 8.5l-9.1 9.1Z" />
    </svg>
  );
}
