function Sidebar() {
  return (
    <div className="hidden sm:flex w-48 mt-20 bg-white border-r border-gray-200 flex-col min-h-screen">
      <div className="p-4 border-b border-gray-200 relative">
        {/* Custom-colored left line */}
        <div
          className="absolute left-0 top-0 h-full w-1 rounded-r"
          style={{ backgroundColor: "#664895" }}
        />
        {/* Custom-colored text */}
        <h2 className="font-semibold pl-2" style={{ color: "#664895" }}>
          Outstanding Report
        </h2>
      </div>
    </div>
  );
}

export default Sidebar;
