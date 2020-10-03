import {Subscription} from 'rxjs';

export function closeSubscriptions(subs: Subscription[]) {
  subs.forEach(sub => {
    if (sub) {
      sub.unsubscribe();
    }
  });
}
