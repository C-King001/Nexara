export const departments = [
  {
    id: "sciences", name: "Sciences", shortCode: "SCI", color: "#1A6338", colorClass: "dept-sciences", accent: "#2ECC71", icon: "🔬",
    description: "Rigorous science education preparing students for medicine, engineering, and STEM careers.",
    students: 1240,
    courses: ["Biology", "Chemistry", "Physics", "Mathematics", "Further Mathematics"],
    universities: ["University of Lagos", "ABU Zaria", "University of Ibadan", "OAU Ile-Ife"],
  },
  {
    id: "arts", name: "Arts & Humanities", shortCode: "ARTS", color: "#C4501A", colorClass: "dept-arts", accent: "#E67E22", icon: "📚",
    description: "Deep exploration of literature, history, and philosophy for future lawyers, journalists, and leaders.",
    students: 980,
    courses: ["Literature in English", "History", "Government", "Christian Religious Studies", "Islamic Religious Studies", "Fine Arts"],
    universities: ["University of Nigeria Nsukka", "UNILAG", "BUK Kano"],
  },
  {
    id: "social-sciences", name: "Social Sciences", shortCode: "SS", color: "#102060", colorClass: "dept-social", accent: "#3498DB", icon: "🌍",
    description: "Understanding society, economics, and human behaviour for careers in policy, research, and development.",
    students: 870,
    courses: ["Economics", "Geography", "Government", "Sociology", "Psychology"],
    universities: ["University of Ibadan", "UNILAG", "ABU Zaria", "OAU"],
  },
  {
    id: "commerce", name: "Commercial Studies", shortCode: "COM", color: "#8B5E3C", colorClass: "dept-commerce", accent: "#D4A017", icon: "📊",
    description: "Business education laying the foundation for accounting, finance, and entrepreneurship.",
    students: 760,
    courses: ["Accounting", "Business Management", "Economics", "Commerce", "Financial Accounting"],
    universities: ["University of Lagos", "ABU Zaria", "UNIBEN", "LASU"],
  },
  {
    id: "technology", name: "Technology & Computing", shortCode: "TECH", color: "#4A1D96", colorClass: "dept-tech", accent: "#8B5CF6", icon: "💻",
    description: "Cutting-edge computing and mathematics education for Nigeria's digital future.",
    students: 650,
    courses: ["Mathematics", "Further Mathematics", "Physics", "Computer Science", "Technical Drawing"],
    universities: ["UNILAG", "OAU", "FUTA", "Covenant University"],
  },
];

export const stats = [
  { label: "Students Enrolled", value: "5,200+", icon: "👨‍🎓" },
  { label: "Departments", value: "5", icon: "🏛️" },
  { label: "Program Duration", value: "9 Months", icon: "📅" },
  { label: "University Placement", value: "95%", icon: "🎓" },
  { label: "Partner Universities", value: "30+", icon: "🏫" },
  { label: "Years of Excellence", value: "12+", icon: "⭐" },
];

export const faqs = [
  { question: "What is the IJMB program?", answer: "IJMB (Interim Joint Matriculation Board) is an advanced level pre-degree program that provides secondary school graduates a direct pathway to 200-level admission in Nigerian universities. It is the most widely accepted alternative to UTME for direct entry admission." },
  { question: "How long is the IJMB program?", answer: "The program runs for 9 months — three terms of roughly 13 weeks each. It mirrors the A-Level academic calendar and concludes with formal examinations." },
  { question: "Which universities accept IJMB results?", answer: "Over 30 Nigerian federal and state universities accept IJMB results for direct entry, including University of Lagos, ABU Zaria, University of Ibadan, OAU Ile-Ife, University of Nigeria Nsukka, and many more." },
  { question: "What are the admission requirements?", answer: "Applicants must have a minimum of 5 credits in their WAEC/NECO results including English Language and Mathematics. Science students require credits in relevant science subjects." },
  { question: "How is IJMB different from A-Levels?", answer: "IJMB is specifically designed for Nigerian university direct entry. While similar in structure to A-Levels, IJMB is recognized by Nigerian universities under the JAMB direct entry scheme and is more affordable and accessible." },
  { question: "Can I choose my subjects?", answer: "Yes. After selecting your department, you choose 3 principal subjects relevant to your intended university course. You'll also take a General Studies component." },
  { question: "What happens after IJMB?", answer: "After receiving your IJMB results, you apply for university direct entry through JAMB. With a strong IJMB result, you bypass 100-level and gain direct admission into 200-level." },
  { question: "Is there online learning available?", answer: "Yes. Our platform provides a full digital learning experience including recorded lectures, live classes, downloadable PDF notes, past questions, and online assessments — accessible 24/7 from any device." },
  { question: "How much does the program cost?", answer: "Program fees are competitive and structured to be accessible. We offer installment payment options. Contact us or check the admissions page for current fee schedule for the 2025/2026 session." },
  { question: "What is the pass rate for IJMB students?", answer: "Our students consistently achieve above-average results. Over 95% of our graduates successfully gain university direct entry admission each year, with many scoring distinctions." },
];

export const admissionSteps = [
  { step: "01", title: "Create Account", description: "Register on the platform with your name, email, and basic details. Upload your passport photo.", icon: "👤" },
  { step: "02", title: "Complete Application", description: "Select your preferred department and subjects. Fill in your academic background and upload O'Level results.", icon: "📝" },
  { step: "03", title: "Pay Application Fee", description: "Pay the non-refundable application fee securely via card or bank transfer through our Paystack integration.", icon: "💳" },
  { step: "04", title: "Admission Review", description: "Our admissions team reviews your application within 3-5 working days. You'll receive an email notification.", icon: "🔍" },
  { step: "05", title: "Accept Offer & Enroll", description: "If approved, accept your admission offer, pay the tuition fee, and gain full access to the student portal.", icon: "🎉" },
];

export const announcements = [
  { id: 1, title: "2025/2026 Session Applications Now Open", date: "May 20, 2025", category: "Admissions", excerpt: "Applications for the 2025/2026 IJMB session are now open. Early applications receive a discount on the application fee.", urgent: true },
  { id: 2, title: "First Term Examination Timetable Released", date: "May 15, 2025", category: "Academic", excerpt: "The first term examination timetable for current students is now available on the student portal.", urgent: false },
  { id: 3, title: "New Study Materials: Sciences Department", date: "May 10, 2025", category: "Academic", excerpt: "Updated Biology and Chemistry notes for Week 8 have been uploaded.", urgent: false },
  { id: 4, title: "Scholarship Opportunities for 2025 Students", date: "May 5, 2025", category: "Scholarship", excerpt: "IJMB.program is offering merit-based fee waivers for outstanding applicants.", urgent: false },
];

export const mockStudentData = {
  name: "Aisha Mohammed", id: "IJMB/2025/SCI/001", department: "Sciences",
  email: "aisha.m@student.ijmbprogram.ng", phone: "+234 803 456 7890",
  enrolled: "January 2025", photo: "AM", departmentColor: "#1A6338",
  courses: [
    { code: "BIO301", name: "Biology", lecturer: "Dr. Adeyemi Femi", ca: 72, exam: null, grade: null },
    { code: "CHE301", name: "Chemistry", lecturer: "Prof. Ngozi Okonkwo", ca: 68, exam: null, grade: null },
    { code: "PHY301", name: "Physics", lecturer: "Dr. Ibrahim Musa", ca: 75, exam: null, grade: null },
    { code: "MAT301", name: "Mathematics", lecturer: "Dr. Chisom Eze", ca: 80, exam: null, grade: null },
  ],
  payments: [
    { description: "Application Fee", amount: 5000, date: "Dec 10, 2024", status: "Paid", receipt: "RCP-2024-001" },
    { description: "Tuition Fee - 1st Installment", amount: 75000, date: "Jan 5, 2025", status: "Paid", receipt: "RCP-2025-001" },
    { description: "Tuition Fee - 2nd Installment", amount: 75000, date: "Mar 5, 2025", status: "Paid", receipt: "RCP-2025-002" },
    { description: "Tuition Fee - 3rd Installment", amount: 75000, date: "May 5, 2025", status: "Pending", receipt: null },
  ],
  schedule: [
    { day: "Monday", time: "08:00 - 10:00", course: "Biology", room: "Lab Block A" },
    { day: "Monday", time: "12:00 - 14:00", course: "Mathematics", room: "Hall 3" },
    { day: "Tuesday", time: "08:00 - 10:00", course: "Chemistry", room: "Lab Block B" },
    { day: "Wednesday", time: "10:00 - 12:00", course: "Physics", room: "Science Hall" },
    { day: "Thursday", time: "08:00 - 10:00", course: "Mathematics", room: "Hall 3" },
    { day: "Friday", time: "08:00 - 10:00", course: "Biology", room: "Lab Block A" },
  ],
  assignments: [
    { title: "Cell Division Essay", course: "Biology", dueDate: "May 30, 2025", status: "Pending", marks: null },
    { title: "Organic Chemistry Problem Set", course: "Chemistry", dueDate: "May 28, 2025", status: "Submitted", marks: 88 },
    { title: "Newton's Laws Lab Report", course: "Physics", dueDate: "May 25, 2025", status: "Graded", marks: 76 },
    { title: "Calculus Test Prep", course: "Mathematics", dueDate: "Jun 2, 2025", status: "Pending", marks: null },
  ],
  materials: [
    { title: "Biology Week 8 — Cell Biology", course: "Biology", type: "PDF", size: "2.4 MB", uploaded: "May 18, 2025" },
    { title: "Chemistry Notes — Organic Compounds", course: "Chemistry", type: "PDF", size: "3.1 MB", uploaded: "May 15, 2025" },
    { title: "Physics Video Lecture — Electromagnetism", course: "Physics", type: "Video", size: "245 MB", uploaded: "May 12, 2025" },
    { title: "2023 Past Questions — All Subjects", course: "General", type: "PDF", size: "8.7 MB", uploaded: "May 10, 2025" },
    { title: "Mathematics — Differentiation Practice", course: "Mathematics", type: "PDF", size: "1.8 MB", uploaded: "May 8, 2025" },
  ],
};

export const mockAdminStats = {
  totalStudents: 5200, activeStudents: 4980, pendingApplications: 247,
  departmentBreakdown: [
    { name: "Sciences", count: 1240, color: "#1A6338" },
    { name: "Arts", count: 980, color: "#C4501A" },
    { name: "Social Sciences", count: 870, color: "#102060" },
    { name: "Commerce", count: 760, color: "#8B5E3C" },
    { name: "Technology", count: 650, color: "#4A1D96" },
  ],
  recentApplications: [
    { name: "Oluwaseun Adeyemi", dept: "Sciences", date: "May 25, 2025", status: "Pending" },
    { name: "Blessing Nwosu", dept: "Commerce", date: "May 25, 2025", status: "Pending" },
    { name: "Hassan Usman", dept: "Arts", date: "May 24, 2025", status: "Approved" },
    { name: "Chidinma Obi", dept: "Social Sciences", date: "May 24, 2025", status: "Pending" },
    { name: "Emmanuel Eze", dept: "Technology", date: "May 23, 2025", status: "Approved" },
    { name: "Zainab Aliyu", dept: "Sciences", date: "May 23, 2025", status: "Rejected" },
  ],
  revenueThisMonth: 12450000, outstandingFees: 3200000,
};

export const mockTeacherData = {
  name: "Dr. Adeyemi Femi", subject: "Biology", department: "Sciences",
  classes: [
    { code: "BIO301-A", name: "Biology (Sciences A)", students: 42, term: "First Term" },
    { code: "BIO301-B", name: "Biology (Sciences B)", students: 38, term: "First Term" },
    { code: "BIO302", name: "Advanced Biology", students: 25, term: "First Term" },
  ],
  recentUploads: [
    { title: "Cell Division — Mitosis and Meiosis", class: "BIO301-A", date: "May 18, 2025", type: "PDF" },
    { title: "Genetics Video Lecture Part 2", class: "BIO301-B", date: "May 15, 2025", type: "Video" },
    { title: "Ecology Practice Questions", class: "BIO302", date: "May 12, 2025", type: "PDF" },
  ],
  pendingGrades: 45,
};

export const testimonials = [
  { name: "Aisha Mohammed", role: "Now studying Medicine at ABU Zaria", dept: "Sciences", avatar: "AM", avatarColor: "#1A6338", quote: "IJMB.program changed my life. I failed JAMB twice before discovering this path. Nine months later, I was admitted to study Medicine.", year: "2024 Graduate", university: "ABU Zaria" },
  { name: "Chukwuemeka Obi", role: "Now studying Law at University of Lagos", dept: "Arts", avatar: "CO", avatarColor: "#C4501A", quote: "The quality of teaching here is incredible. My Government and Literature tutors were deeply knowledgeable. I scored distinctions.", year: "2024 Graduate", university: "University of Lagos" },
  { name: "Fatima Bello", role: "Now studying Economics at OAU", dept: "Social Sciences", avatar: "FB", avatarColor: "#102060", quote: "What sets IJMB.program apart is the student portal. Being able to access lecture notes, track my CA scores, and sit mock exams online gave me a huge advantage.", year: "2023 Graduate", university: "OAU Ile-Ife" },
];
