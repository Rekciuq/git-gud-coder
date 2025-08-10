DROP TRIGGER IF EXISTS update_course_avg_rating_after_insert;
CREATE TRIGGER update_course_avg_rating_after_insert
AFTER INSERT ON CourseRating
BEGIN
  UPDATE Course
  SET avgRating = (
    SELECT AVG(rating)
    FROM CourseRating
    WHERE courseId = NEW.courseId
  )
  WHERE id = NEW.courseId;
END;

DROP TRIGGER IF EXISTS update_course_avg_rating_after_update;
CREATE TRIGGER update_course_avg_rating_after_update
AFTER UPDATE ON CourseRating
BEGIN
  UPDATE Course
  SET avgRating = (
    SELECT AVG(rating)
    FROM CourseRating
    WHERE courseId = NEW.courseId
  )
  WHERE id = NEW.courseId;
END;

DROP TRIGGER IF EXISTS update_course_avg_rating_after_delete;
CREATE TRIGGER update_course_avg_rating_after_delete
AFTER DELETE ON CourseRating
BEGIN
  UPDATE Course
  SET avgRating = (
    SELECT AVG(rating)
    FROM CourseRating
    WHERE courseId = OLD.courseId
  )
  WHERE id = OLD.courseId;
END;
