# Proximity Service with NestJS

This repository showcases the implementation of two geographic search algorithms within a NestJS application: **GeoHash** and **Quadtree**. The project is designed to explore and demonstrate how these algorithms can be employed to manage and query spatial data effectively in server-side environments.

## Features

- **GeoHash Implementation**: Provides coarse-grained spatial queries using GeoHash, which is ideal for fast location lookup and spatial indexing.
- **Quadtree Implementation**: Implements a Quadtree-based approach for fine-grained spatial queries, offering precise and efficient querying of spatial data.

## Getting Started

These instructions will guide you through setting up the project on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- NestJS CLI
- TypeScript

### Installation

Follow these steps to get your development environment running:

1. **Clone the repository:**

   ```bash
   git clone
   ```

2. **Navigate to the project directory:**

   ```
   cd proximity-service
   ```

3. **Install dependencies:**

   ```
   npm install
   ```

4. **Start the development server:**

   ```
   npm run start:dev
   ```

## Built With

- [NestJS](https://nestjs.com/) - The framework used for building scalable server-side applications.
- [d3-quadtree](https://github.com/d3/d3-quadtree) - Used to implement the Quadtree data structure .
- [ngeohash](https://github.com/sunng87/node-geohash) - Used to implement GeoHash.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

Special thanks to [ByteByteGo](https://bytebytego.com/) for their "System Design Interview" course. Not only did it inspire the idea for this project, but it also provided in-depth explanations of different geographic search algorithms.
The course is available at [ByteByteGo System Design Interview](https://bytebytego.com/courses/system-design-interview).

## License

Nest is [MIT licensed](LICENSE).
