This is a sample project demonstrating how to work with image uploads using React, Apollo and Graphql.

# Technology Used

 - React
 - Typescript
 - Apollo
 - Graphql
 - Kue job queue
 - Sequalize
 - Postgres

# Notable Features

 - When images are uploaded
    - image metadata is saved to the database.
    - A background job processes the photo, creating an svg representation of the photo
    - SVG is passed back to main process and saved to database 
 - Network traffic is simulated by delaying each request by 1 second, to show the usefulness of the above.
 - Data is modeled using `sequalize-typescript`
 - 