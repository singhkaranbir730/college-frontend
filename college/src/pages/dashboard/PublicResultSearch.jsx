import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";

const PublicResultSearch = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [period, setPeriod] = useState("");
  const [session, setSession] = useState("");
  const [resultData, setResultData] = useState(null);
  const [allResults, setAllResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAllResults, setShowAllResults] = useState(false);

  // API call to fetch result by roll number with optional filters
  const fetchResultByRoll = async (roll, periodFilter = "", sessionFilter = "") => {
    try {
      let url = `/result/student/${roll}`;
      const params = new URLSearchParams();
      
      if (periodFilter) params.append('period', periodFilter);
      if (sessionFilter) params.append('session', sessionFilter);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch result" };
    }
  };

  // API call to fetch all results for a student
  const fetchAllResultsByRoll = async (roll) => {
    try {
      const response = await axiosInstance.get(`/result/student/${roll}/all`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch results" };
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!rollNumber.trim()) {
      setError("Please enter a roll number");
      toast.error("Please enter a roll number");
      return;
    }

    setError("");
    setLoading(true);
    setResultData(null);
    setAllResults([]);
    setShowAllResults(false);

    try {
      const response = await fetchResultByRoll(
        rollNumber.trim().toUpperCase(),
        period.trim(),
        session.trim()
      );

      if (response.success && response.data) {
        setResultData(response.data);
        toast.success("Result found successfully! ✅");
      } else {
        setError("No result found for the given parameters");
        toast.info("No result found for the given parameters");
      }
    } catch (error) {
      console.error("Search error:", error);
      setError(error.message || "No result found for the given parameters");
      toast.error("Failed to fetch result");
    } finally {
      setLoading(false);
    }
  };

  const handleViewAllResults = async () => {
    if (!rollNumber.trim()) {
      toast.error("Please enter a roll number first");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetchAllResultsByRoll(rollNumber.trim().toUpperCase());

      if (response.success && response.data && response.data.length > 0) {
        setAllResults(response.data);
        setShowAllResults(true);
        setResultData(null);
        toast.success(`Found ${response.data.length} result(s)! ✅`);
      } else {
        setError("No results found for the given roll number");
        toast.info("No results found for the given roll number");
      }
    } catch (error) {
      console.error("Fetch all error:", error);
      setError(error.message || "Failed to fetch all results");
      toast.error("Failed to fetch all results");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setRollNumber("");
    setPeriod("");
    setSession("");
    setResultData(null);
    setAllResults([]);
    setShowAllResults(false);
    setError("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  // Calculate percentage
  const calculatePercentage = (subjects) => {
    if (!subjects?.length) return 0;
    const totalMarks = subjects.reduce(
      (sum, subject) => sum + Number(subject.maxMarks || 0),
      0
    );
    const obtainedMarks = subjects.reduce(
      (sum, subject) => sum + Number(subject.obtainedMarks || 0),
      0
    );
    return totalMarks > 0 ? ((obtainedMarks / totalMarks) * 100).toFixed(2) : 0;
  };

  // Render single result card
  const ResultCard = ({ data }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
      {/* Result Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
        <h2 className="text-2xl font-bold mb-2">Result Card</h2>
        <div className="flex flex-wrap gap-2">
          <div
            className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
              data.status === "Pass" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {data.status || "N/A"}
          </div>
        </div>
      </div>

      {/* Student Information */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Student Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Full Name", value: data.studentInfo?.fullName },
            { label: "Roll Number", value: data.studentInfo?.rollNumber },
            { label: "Course", value: data.studentInfo?.course },
            { 
              label: data.studentInfo?.periodType === "semester" ? "Semester" : "Year", 
              value: data.studentInfo?.period 
            },
            { label: "Session", value: data.studentInfo?.session },
          ].map((field) => (
            <div key={field.label} className="flex flex-col">
              <span className="text-sm text-gray-600 font-medium">
                {field.label}
              </span>
              <span className="text-gray-800 font-semibold">
                {field.value || "N/A"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Subjects Table */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Subject-wise Marks
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border border-gray-300 font-semibold">
                  Subject Code
                </th>
                <th className="p-3 border border-gray-300 font-semibold">
                  Subject Name
                </th>
                <th className="p-3 border border-gray-300 font-semibold text-center">
                  Max Marks
                </th>
                <th className="p-3 border border-gray-300 font-semibold text-center">
                  Obtained Marks
                </th>
                <th className="p-3 border border-gray-300 font-semibold text-center">
                  Grade
                </th>
              </tr>
            </thead>
            <tbody>
              {data.subjects?.map((subject, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-3 border border-gray-300">
                    {subject.code || "N/A"}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {subject.name || "N/A"}
                  </td>
                  <td className="p-3 border border-gray-300 text-center">
                    {subject.maxMarks || 0}
                  </td>
                  <td className="p-3 border border-gray-300 text-center font-semibold">
                    {subject.obtainedMarks || 0}
                  </td>
                  <td className="p-3 border border-gray-300 text-center">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        subject.grade === "A+" || subject.grade === "A"
                          ? "bg-green-100 text-green-800"
                          : subject.grade === "B+" || subject.grade === "B"
                          ? "bg-blue-100 text-blue-800"
                          : subject.grade === "C+" || subject.grade === "C"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {subject.grade || "N/A"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Result Summary */}
      <div className="p-6 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Result Summary
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Total Subjects</p>
            <p className="text-2xl font-bold text-gray-800">
              {data.subjects?.length || 0}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Total Marks</p>
            <p className="text-2xl font-bold text-gray-800">
              {data.totalMarks || data.subjects?.reduce(
                (sum, subject) => sum + Number(subject.maxMarks || 0),
                0
              )}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Obtained Marks</p>
            <p className="text-2xl font-bold text-blue-600">
              {data.obtainedMarks || data.subjects?.reduce(
                (sum, subject) => sum + Number(subject.obtainedMarks || 0),
                0
              )}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Percentage</p>
            <p className="text-2xl font-bold text-green-600">
              {data.percentage || calculatePercentage(data.subjects)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Student Result Portal
          </h1>
          <p className="text-gray-600">
            Enter your details to view your result
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Roll Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., 123AB"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value.toUpperCase())}
                  onKeyPress={handleKeyPress}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Period (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., 1 or 1st Year"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Session (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., 2024-2025"
                  value={session}
                  onChange={(e) => setSession(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="submit"
                disabled={loading || !rollNumber.trim()}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Searching..." : "Search Result"}
              </button>
              <button
                type="button"
                onClick={handleViewAllResults}
                disabled={loading || !rollNumber.trim()}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                View All Results
              </button>
              {(resultData || allResults.length > 0 || error) && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </form>

          {/* Error Message */}
          {error && !resultData && allResults.length === 0 && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Loading Indicator */}
          {loading && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-600 text-center">Loading result...</p>
            </div>
          )}
        </div>

        {/* Single Result Display */}
        {resultData && !loading && !showAllResults && (
          <>
            <ResultCard data={resultData} />
            {/* Print Button */}
            <div className="flex justify-center mb-6">
              <button
                onClick={() => window.print()}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                  />
                </svg>
                Print Result
              </button>
            </div>
          </>
        )}

        {/* All Results Display */}
        {showAllResults && allResults.length > 0 && !loading && (
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                All Results for {rollNumber}
              </h2>
              <p className="text-gray-600 text-sm">
                Found {allResults.length} result(s)
              </p>
            </div>
            {allResults.map((result, index) => (
              <ResultCard key={index} data={result} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicResultSearch;
