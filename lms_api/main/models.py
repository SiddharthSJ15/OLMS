from django.db import models
from django.core import serializers
# Create your models here.


# TUTOR MODEL

class Teacher(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100,null=True,blank=True)
    qualification = models.CharField(max_length=200)
    # detail = models.TextField(null=True)
    mobile_no = models.CharField(max_length=20)
    profile_img = models.ImageField(upload_to='teacher_profile_imgs/', null=True)
    skills = models.TextField()

    class Meta:
        verbose_name_plural = '1. Teacher'
    def __str__(self):
        return self.email
    
    def skill_list(self):
        skill_list = self.skills.split(',')
        return skill_list
    # TOTAL TEACHER COURSES
    def total_teacher_courses(self):
        total_courses = Course.objects.filter(teacher=self).count()
        return total_courses
    # TOTAL TEACHER CHAPTERS
    def total_teacher_chapters(self):
        total_chapters = Chapter.objects.filter(course__teacher=self).count()
        return total_chapters
    # TOTAL TEACHER STUDENTS
    def total_teacher_student(self):
        total_students = StudentCourseEnrollment.objects.filter(course__teacher=self).count()
        return total_students

# COURSE CATEGORY MODEL

class CourseCategory(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField()
    class Meta:
        verbose_name_plural = '2. Course Categories'
    
    def total_courses(self):
        return Course.objects.filter(category=self).count()
    def __str__(self):
        return self.title

# COURSE MODEL

class Course(models.Model):
    category = models.ForeignKey(CourseCategory, on_delete=models.CASCADE,related_name="category_courses")
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE,related_name='teacher_courses')
    title = models.CharField(max_length=150)
    description = models.TextField()
    featured_img = models.ImageField(upload_to='course_imgs/', null=True)
    techs = models.TextField(null=True)
    course_views = models.BigIntegerField(default=0)
    
    class Meta:
        verbose_name_plural = '3. Course'

    def related_videos(self):
        related_videos = Course.objects.filter(techs__icontains=self.techs)
        return serializers.serialize('json',related_videos)
    
    def tech_list(self):
        tech_list = self.techs.split(',')
        return tech_list
    def total_enrolled_students(self):
        total_enrolled_students = StudentCourseEnrollment.objects.filter(course=self).count()
        return total_enrolled_students
    
    def course_rating(self):
        course_rating = CourseRating.objects.filter(course=self).aggregate(avg_rating=models.Avg('rating'))
        return course_rating['avg_rating']
    
    def __str__(self):
        return self.title

# CHAPTER MODEL

class Chapter(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='course_chapters')
    title = models.CharField(max_length=150)
    description = models.TextField()
    video = models.FileField(upload_to='chapter_videos/', null=True)
    remarks = models.TextField(null=True)
    class Meta:
        verbose_name_plural = '4. Chapters'


# STUDENT MODEL

class Student(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100,null=True,blank=True)
    username = models.CharField(max_length=200)
    interested_categories = models.TextField()
    profile_img = models.ImageField(upload_to='student_profile_imgs/', null=True)
    class Meta:
        verbose_name_plural = '5. Student'
    def __str__(self):
        return self.full_name
    
        # TOTAL ENROLLED COURSES
    def enrolled_courses(self):
        enrolled_courses = StudentCourseEnrollment.objects.filter(student=self).count()
        return enrolled_courses
    
    # TOTAL FAVORITE CHAPTERS
    def favorite_courses(self):
        favorite_courses = StudentFavoriteCourse.objects.filter(student=self).count()
        return favorite_courses
    
    # COMPLETED ASSIGNMENTS
    def complete_assignments(self):
        complete_assignments = StudentAssignment.objects.filter(student=self,student_status=True).count()
        return complete_assignments
    
    # PENDING ASSIGNMENTS
    def pending_assignments(self):
        pending_assignments = StudentAssignment.objects.filter(student=self,student_status = False).count()
        return pending_assignments

# Student Course Enrollment

class StudentCourseEnrollment(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    enrolled_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = '6. Enrolled Courses'

    def __str__(self):
        return f"{self.course}-{self.student}"
    
# Student Favorite Course 

class StudentFavoriteCourse(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    status = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = '8. Student Favorite Courses'

    def __str__(self):
        return f"{self.course}-{self.student}"
    
class CourseRating(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrolled_courses')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='enrolled_students')
    rating = models.PositiveBigIntegerField(default=0)
    reviews = models.TextField(null=True)
    review_time = models.DateTimeField(auto_now_add=True)
    class Meta:
        verbose_name_plural = '7. Course Rating'

    def __str__(self):
        return f"{self.course}-{self.student}-{self.rating}"
    

class StudentAssignment(models.Model): 
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    detail = models.TextField(null=True)
    add_time = models.DateTimeField(auto_now_add=True)
    student_status =  models.BooleanField(default=False)
    class Meta:
        verbose_name_plural = '9. Student Assignments'

    def __str__(self):
        return f"{self.title}"

class Notification(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, null=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, null=True)
    notif_for=models.CharField(max_length=200, verbose_name='Notification For')
    notif_subject=models.CharField(max_length=200, verbose_name='Notification Subject', null=True)
    created_time=models.DateTimeField(auto_now_add=True, verbose_name='Notification Created Time')
    read_status = models.BooleanField(default=False, verbose_name='Notification Read Status')
    class Meta:
        verbose_name_plural = '10. Notifications'

# QUIZ MODEL
class Quiz(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, null=True)
    # student = models.ForeignKey(Student, on_delete=models.CASCADE, null=True)
    title=models.CharField(max_length=200)
    detail=models.TextField()
    add_time=models.DateTimeField(auto_now_add=True)

    def assign_status(self):
        return CourseQuiz.objects.filter(quiz=self).count()
    
    class Meta:
        verbose_name_plural = '11. Quiz'

# QUIZ QUESTION MODEL
class QuizQuestions(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, null=True)
    # title = models.CharField(max_length=200)
    questions = models.CharField(max_length=200)
    ans1 = models.CharField(max_length=200)
    ans2 = models.CharField(max_length=200)
    ans3 = models.CharField(max_length=200)
    ans4 = models.CharField(max_length=200)
    right_ans = models.CharField(max_length=200)
    add_time = models.DateTimeField(auto_now_add=True)
    class Meta:
        verbose_name_plural = '12. Quiz Questions'

# ADD QUIZ TO COURSE
class CourseQuiz(models.Model):    
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, null=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, null=True)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, null=True)
    add_time = models.DateTimeField(auto_now_add=True)
    class Meta:
        verbose_name_plural = '13. Course Quiz'

# QUIZ ATTEMPT BY USER
class AttemptQuiz(models.Model):    
    student = models.ForeignKey(Student, on_delete=models.CASCADE, null=True)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, null=True)
    question = models.ForeignKey(QuizQuestions, on_delete=models.CASCADE, null=True)
    right_ans = models.CharField(max_length=200, null=True)
    add_time = models.DateTimeField(auto_now_add=True)
    class Meta:
        verbose_name_plural = '14. Attempted Questions'

# Study Material
class StudyMaterial(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    # teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE,related_name='teacher_courses')
    title = models.CharField(max_length=150)
    description = models.TextField()
    upload = models.FileField(upload_to='study_materials/', null=True)
    remarks = models.TextField(null=True)
    class Meta:
        verbose_name_plural = '15. Study materials'

# FAQ Page
class FAQ(models.Model):
    question=models.CharField(max_length=300)
    answer=models.TextField()

    class Meta:
        verbose_name_plural = '16. FAQ'