import kue from 'kue';
import traceImage from './src/lib/traceImage';

const queue = kue.createQueue();

queue.process('svg_trace', 1, async (job, done) => {
  console.log('starting to process');
  const svg = await traceImage(job.data.imagePath)
  job.progress(1, 1, svg)
  done()
})