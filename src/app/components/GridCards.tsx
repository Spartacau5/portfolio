'use client';

export function GridCards() {
  return (
      <div className="container home">
        <div className="grid-top-bar">
          <div className="view-controls-div">
            <img src="/images/arrow.svg" loading="lazy" alt="" className="list-icon" />
            <div className="caption-text-w-icon">Look around...</div>
          </div>
        </div>
      <div className="grid grid-cols-12 gap-4">
        {/* Row 1 */}
        {/* Icon Card 1 - Command Key */}
        <div className="col-span-3 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-500 transform rotate-0 hover:rotate-2 relative group">
          <div className="text-7xl font-light text-gray-800">⌘</div>
          <button className="absolute bottom-4 right-4 w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </button>
        </div>

        {/* Icon Card 2 - V */}
        <div className="col-span-3 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-500 transform rotate-0 hover:rotate-2 relative group">
          <div className="text-7xl font-light text-gray-800">V</div>
          <button className="absolute bottom-4 right-4 w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </button>
        </div>

        {/* Phone Mockup Card */}
        <div className="col-span-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-500 transform rotate-0 hover:rotate-2 relative flex items-center justify-center min-h-[25rem]">
          <div className="relative w-[200px] h-[400px] bg-black rounded-[2.5rem] p-2 shadow-2xl">
            <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden">
              {/* Phone Screen Content */}
              <div className="p-4 h-full flex flex-col">
                {/* Status Bar */}
                <div className="flex justify-between items-center mb-2 text-xs">
                  <span>9:41</span>
                  <div className="flex gap-1">
                    <span>📶</span>
                    <span>📡</span>
                    <span>🔋</span>
                  </div>
                </div>

                {/* Calendar Header */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-red-500 text-sm">✂️</span>
                    <span className="text-xs text-gray-600">Meet with</span>
                    <span className="text-xs font-semibold">Jess Wander</span>
                  </div>

                  <div className="flex gap-2 mb-4">
                    <div className="text-center">
                      <div className="text-[10px] text-gray-400">Sun</div>
                      <div className="text-sm">20</div>
                    </div>
                    <div className="text-center bg-red-500 text-white rounded-lg px-2 py-1">
                      <div className="text-[10px]">Mon</div>
                      <div className="text-sm font-bold">21</div>
                    </div>
                    <div className="text-center bg-red-500 text-white rounded-lg px-2 py-1">
                      <div className="text-[10px]">Tue</div>
                      <div className="text-sm font-bold">22</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] text-gray-400">Wed</div>
                      <div className="text-sm">23</div>
                    </div>
                  </div>
                </div>

                {/* Calendar Title */}
                <div className="mb-2">
                  <div className="text-[8px] text-gray-400 uppercase mb-1">Calendar</div>
                  <div className="text-sm font-semibold">Monday, Nov 21st</div>
                </div>

                {/* Events */}
                <div className="flex-1 space-y-2 overflow-hidden">
                  <div className="text-[8px] text-gray-400">9 AM</div>
                  <div className="bg-blue-100 rounded-lg p-2 border-l-4 border-blue-400">
                    <div className="text-[10px] font-semibold">Daily Standup</div>
                    <div className="text-[8px] text-gray-600">10:00am – 11:00am</div>
                  </div>
                  <div className="bg-green-100 rounded-lg p-2 border-l-4 border-green-400">
                    <div className="text-[10px] font-semibold">1-on-1 Interview</div>
                    <div className="text-[8px] text-gray-600">11:00am – 12:00pm</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="absolute bottom-4 right-4 w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </button>
        </div>

        {/* Careers Card */}
        <div className="col-span-3 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-500 transform rotate-0 hover:rotate-2 relative flex flex-col justify-center items-center min-h-[25rem]">
          <h2 className="text-5xl font-black text-gray-400 mb-2">Careers</h2>
          <p className="text-2xl text-gray-500">at CommandDot</p>
          <button className="absolute bottom-4 right-4 w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </button>
        </div>

        {/* Row 2 */}
        {/* Availability Calendar Card */}
        <div className="col-span-3 bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-500 transform rotate-0 hover:rotate-2 relative">
          <div className="mb-4">
            <div className="text-xs text-gray-400 uppercase tracking-wide mb-2">Availability Calendar</div>
            <h3 className="text-xl font-semibold text-gray-900">Monday, Nov 21st</h3>
          </div>

          <div className="mb-4">
            <div className="flex gap-2 text-xs">
              <div className="text-center">
                <div className="text-gray-400">Sun</div>
                <div className="text-gray-900">20</div>
              </div>
              <div className="text-center bg-red-500 text-white rounded-lg px-2 py-1">
                <div>Mon</div>
                <div className="font-bold">21</div>
              </div>
              <div className="text-center bg-red-500 text-white rounded-lg px-2 py-1">
                <div>Tue</div>
                <div className="font-bold">22</div>
              </div>
              <div className="text-center">
                <div className="text-gray-400">Wed</div>
                <div className="text-gray-900">23</div>
              </div>
              <div className="text-center">
                <div className="text-gray-400">Thu</div>
                <div className="text-gray-900">24</div>
              </div>
              <div className="text-center">
                <div className="text-gray-400">Fri</div>
                <div className="text-gray-900">25</div>
              </div>
              <div className="text-center">
                <div className="text-gray-400">Sat</div>
                <div className="text-gray-900">26</div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-xs text-gray-400 uppercase tracking-wide mb-2">Days of the Week</div>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs rounded-full border border-gray-200 hover:bg-gray-50">📅</button>
              <button className="px-3 py-1 text-xs rounded-full border border-gray-200 hover:bg-gray-50">Sun</button>
              <button className="px-3 py-1 text-xs rounded-full border border-gray-200 hover:bg-gray-50">Mon</button>
              <button className="px-3 py-1 text-xs rounded-full border border-gray-200 hover:bg-gray-50">Tue</button>
              <button className="px-3 py-1 text-xs rounded-full border border-gray-200 hover:bg-gray-50">Wed</button>
              <button className="px-3 py-1 text-xs rounded-full border border-gray-200 hover:bg-gray-50">Thu</button>
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-400 uppercase tracking-wide mb-2">Duration</div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⏱</span>
              <span className="text-xl font-semibold">60 minutes</span>
            </div>
          </div>

          <button className="absolute top-4 right-4 w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </button>
        </div>

        {/* Small Moments BiG JoY Card */}
        <div className="col-span-6 bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-500 transform rotate-0 hover:rotate-2 relative flex items-center justify-center min-h-[18.75rem]">
          <div className="text-center">
            <p className="text-3xl text-gray-400 mb-2">Small Moments</p>
            <h2 className="text-7xl font-black text-gray-300">BiG JoY</h2>
          </div>
          <button className="absolute bottom-4 right-4 w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </button>
        </div>

        {/* Lock Icon Card */}
        <div className="col-span-3 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-500 transform rotate-0 hover:rotate-2 relative flex items-center justify-center min-h-[18.75rem]">
          <svg className="w-32 h-32 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <button className="absolute bottom-4 right-4 w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </button>
        </div>

        {/* 3D Logo Card */}
        <div className="col-span-3 bg-gradient-to-br from-gray-100 to-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-500 transform rotate-0 hover:rotate-2 relative flex items-center justify-center min-h-[18.75rem]">
          <div className="text-9xl font-black text-gray-300 transform rotate-12">
            ⌘E
          </div>
          <button className="absolute bottom-4 right-4 w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
