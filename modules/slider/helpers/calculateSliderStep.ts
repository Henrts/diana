const stepIntervals = [
  {
    value: 100,
    step: 1
  },
  {
    value: 500,
    step: 5
  },
  {
    value: 1000,
    step: 10
  },
  {
    value: 10000,
    step: 100
  },
  {
    value: 25000,
    step: 250
  },
  {
    value: 50000,
    step: 500
  }
];

const calculateSliderStep = (value: number) =>
  stepIntervals.find(interval => value < interval.value)?.step || 1000;

export default calculateSliderStep;
