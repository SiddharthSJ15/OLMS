import Header from './Header';
import Footer from './Footer';
import About from './About';
import Home from './Home';
import CourseDetail from './CourseDetail';
import TeacherDetail from './TeacherDetail';


import {Routes, Route} from 'react-router-dom';

// USER

import Login from './User/Login';
import StudentLogout from './User/StudentLogout'
import Register from './User/Register';
import Dashboard from './User/Dashboard';
import MyCourses from './User/MyCourses';
import FavoriteCourses from './User/FavoriteCourses';
import RecommendedCourses from './User/RecommendedCourses';
import ProfileSetting from './User/ProfileSetting';
import ChangePassword from './User/ChangePassword';
import StudentAssignments from './User/StudentAssignments';
import CourseQuizList from './User/CourseQuizList';
import TakeQuiz from './User/TakeQuiz';

// TUTOR

import TeacherLogin from './Teacher/TeacherLogin';
import TeacherRegister from './Teacher/TeacherRegister';
import TeacherDashboard from './Teacher/TeacherDashboard';
import AddCourse from './Teacher/AddCourse';
import UserList from './Teacher/UserList';
import TeacherCourses from './Teacher/TeacherCourses';
import TeacherProfileSetting from './Teacher/TeacherProfileSetting';
import TeacherChangePassword from './Teacher/TeacherChangePassword';
import AllChapters from './Teacher/CourseChapters';
import StudyMaterials from './Teacher/StudyMaterials';
import AddChapter from './Teacher/AddChapter';
import TeacherLogout from './Teacher/TeacherLogout';
import EditChapter from './Teacher/EditChapter';
import EditCourse from './Teacher/EditCourse';
import EnrolledStudents from './Teacher/EnrolledStudents';
import AddAssignment from './Teacher/AddAssignment';
import ShowAssignment from './Teacher/ShowAssignment';
import AddQuiz from './Teacher/AddQuiz';
import AllQuiz from './Teacher/AllQuiz';
import EditQuiz from './Teacher/EditQuiz';
import QuizQuestions from './Teacher/QuizQuestions';
import AddQuizQuestion from './Teacher/AddQuizQuestion';
import AssignQuiz from './Teacher/AssignQuiz';

// List Pages
import AllCourses from './AllCourses';
import PopularCourses from './PopularCourses';
import PopularTeachers from './PopularTeachers';
import CategoryCourses from './CategoryCourses';
import Category from './Category';
import Seacrh from './Search';

import TeacherSkillCourses from './TeacherSkillCourses';
import AddStudyMaterial from './Teacher/AddStudyMaterial';
import UserStudyMaterial from './User/UserStudyMaterial';
import AttemptedStudents from './Teacher/AttemptedStudents';
import CourseCategory from './CourseCategory';

//Quiz

function Main() {
  return (
    <div className="App d-flex flex-column min-vh-100">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/detail/:course_id" element={<CourseDetail />} />
                <Route path="/category" element={<Category />} />
                
                <Route path="/search/:searchString" element={<Seacrh />} />

                <Route path="/user-login" element={<Login />} />
                <Route path="/user-logout" element={<StudentLogout />} />
                <Route path="/user-register" element={<Register />} />
                <Route path="/user-dashboard" element={<Dashboard />} />
                <Route path="/my-courses" element={<MyCourses />} />
                <Route path="/favorite-courses" element={<FavoriteCourses />} />
                <Route path="/recommended-courses" element={<RecommendedCourses />} />
                <Route path="/profile-setting" element={<ProfileSetting />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/my-assignments" element={<StudentAssignments />} />
                
                <Route path="/teacher-login" element={<TeacherLogin />} />
                <Route path="/teacher-register" element={<TeacherRegister />} />
                <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
                <Route path="/teacher-users" element={<UserList />} />
                <Route path="/add-course" element={<AddCourse />} />
                <Route path="/add-chapter/:course_id" element={<AddChapter />} />
                <Route path="/teacher-course" element={<TeacherCourses />} />
                <Route path="/teacher-profile-setting" element={<TeacherProfileSetting />} />
                <Route path="/teacher-change-password" element={<TeacherChangePassword />} />
                <Route path="/teacher-detail/:teacher_id" element={<TeacherDetail />} />
                <Route path="/teacher-logout" element={<TeacherLogout />} />
                <Route path="/edit-chapter/:chapter_id" element={<EditChapter />} />
                <Route path="/edit-course/:course_id" element={<EditCourse />} />
                <Route path="/all-courses" element={<AllCourses />} />
                <Route path="/all-chapters/:course_id" element={<AllChapters />} />

                <Route path="/study-materials/:course_id" element={<StudyMaterials />} />
                <Route path="/user/study-materials/:course_id" element={<UserStudyMaterial />} />
                <Route path="/add-study-material/:course_id" element={<AddStudyMaterial />} />
                {/* <Route path="/edit-study/:study_id" element={<EditChapter />} /> */}
                <Route path="/enrolled-students/:course_id" element={<EnrolledStudents />} />
                <Route path="/add-assignment/:teacher_id/:student_id" element={<AddAssignment />} />
                <Route path="/show-assignment/:teacher_id/:student_id" element={<ShowAssignment />} />

                <Route path="/popular-courses" element={<PopularCourses />} />
                <Route path="/popular-teachers" element={<PopularTeachers />} />
                <Route path="/course/:category_id/:category_slug" element={<CategoryCourses />} />
                <Route path="/category/:category_slug" element={<CourseCategory />} />
                <Route path="/teacher-skill-courses/:skill_name/:teacher_id" element={<TeacherSkillCourses />} />
                
                {/* QUIZ */}
                <Route path="/quiz" element={<AllQuiz />} />
                <Route path="/add-quiz" element={<AddQuiz />} />
                <Route path="/edit-quiz/:quiz_id" element={<EditQuiz />} />
                <Route path="/all-questions/:quiz_id" element={<QuizQuestions />} />
                <Route path="/add-quiz-question/:quiz_id" element={<AddQuizQuestion />} />
                <Route path="/assign-quiz/:course_id" element={<AssignQuiz />} />
                <Route path="/course-quiz/:course_id" element={<CourseQuizList />} />
                <Route path="/take-quiz/:quiz_id" element={<TakeQuiz />} />
                <Route path="/attempted-students/:quiz_id" element={<AttemptedStudents />} />

                {/* END QUIZ */}
                
            </Routes>
            <Footer />
    </div>
  );
}

export default Main;
