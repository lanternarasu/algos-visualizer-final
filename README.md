we have 5 branches 
-> main
    which contains our user login/register page made with spring hibernate and a feedback form made using react
->frontend
    which is a spring boot application that navigates to our sorting,queue,stack visualizer
->master 
    which is a docker container which could be deployed and has all source code for our stack visualizer
->queue
  which is also a docker container which could be deployed and has all source code for our queue visualizer
->sorting
  which is also a docker container which could be deployed and has all source code for our sorting-algos visualizer

sorting visualizer offers three sorting algos 
  ->bubble sort
  ->quick sort
  ->heap sort
and two microservices
  ->generate random array
  -.generate default array
