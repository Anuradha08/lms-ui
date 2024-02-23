// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  login: "http://localhost:8080/api/v1.0/lms/company/login",
  register: "http://localhost:8080/api/v1.0/lms/company/register",
  getAllCourses: "http://localhost:8080/api/v1.0/lms/courses/getall",
  addCourse: "http://localhost:8080/api/v1.0/lms/courses/add",
  delete: "http://localhost:8080/api/v1.0/lms/courses/delete",
  getCoursesByTechnology: "http://localhost:8080/api/v1.0/lms/courses/info",
  getCourseByDuration: "http://localhost:8080/api/v1.0/lms/courses/get"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
