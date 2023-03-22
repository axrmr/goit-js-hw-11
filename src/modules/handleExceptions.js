import notify from './notify';

export default function handleExceptions(error) {
  if (error.message === '404') {
    notify.notFound();
  } else if (error.message === 'reached limit') {
    notify.reachedLimit();
  } else {
    notify.error(error.message);
  }
}
