import { Subject } from "rxjs";

const isLoggedIn = new Subject();

export const loggedInService = {
  sendIsLoggedIn: loggedIn => isLoggedIn.next(loggedIn),
  getIsLoggedIn: () => isLoggedIn.asObservable()
}