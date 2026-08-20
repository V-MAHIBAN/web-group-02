import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Clock, 
  Play, 
  CheckCircle, 
  Sparkles, 
  Award,
  ChevronRight
} from 'lucide-react';
import { Course } from '../types';

interface MyCoursesViewProps {
  courses: Course[];
  onSelectCourse: (course: Course) => void;
}

export const MyCoursesView: React.FC<MyCoursesViewProps> = ({
  courses,
  onSelectCourse
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Leadership', 'Planning', 'Technology', 'Communications', 'Civic'];

  const filteredCourses = courses.filter(c => {
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            My Courses & Syllabi
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Access your active curriculum modules, case studies, and accredited credentials.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search course or instructor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002868]/20 focus:border-[#002868] w-56 shadow-2xs"
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#002868] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div 
            key={course.id}
            onClick={() => onSelectCourse(course)}
            className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg hover:border-slate-300 transition-all duration-200 flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="h-44 overflow-hidden relative">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 text-[11px] font-bold bg-[#002868] text-white rounded-md shadow-sm">
                    {course.category}
                  </span>
                  <span className="px-2 py-1 text-[10px] font-semibold bg-white/90 text-slate-800 rounded-md">
                    {course.level}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <p className="text-xs font-medium text-slate-400">Instructor: {course.instructor}</p>
                <h3 className="font-bold text-base text-slate-900 mt-1 line-clamp-2 leading-snug group-hover:text-[#BF0A30] transition-colors">
                  {course.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-600 mb-1.5 font-medium">
                  <span>Progress ({course.completedModules}/{course.totalModules} modules)</span>
                  <span className="font-bold text-slate-900">{course.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#BF0A30] h-full rounded-full transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {course.durationRemaining || `${course.totalModules * 45} mins total`}
                </span>
                <span className="text-xs font-bold text-[#002868] group-hover:text-[#BF0A30] flex items-center gap-1 transition-colors">
                  Continue <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
