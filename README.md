# Convex Polygon Inspector

A small interactive web application that checks whether a given point lies **inside**, **outside**, or **on the edge** of a **convex polygon**.

The application visualizes the polygon and the point on a canvas and performs the geometric check using an efficient **O(log n)** algorithm.

---

## 🧩 Features

- Manual input of polygon vertices  
- Manual input of point coordinates (X, Y)
- Interactive canvas:
  - Polygon is rendered visually
  - Clicking on the canvas updates the point automatically
- Real-time result:
  - **INSIDE**
  - **OUTSIDE**
  - **ON_EDGE**
- Clean and simple UI
- Efficient geometric algorithm for convex polygons

---

## 🧠 Algorithm

The solution is based on computational geometry principles and leverages the fact that the polygon is **convex**.

### Key ideas:
- The polygon vertices are normalized to **counter-clockwise (CCW)** order
- A **binary search** is used to locate the triangle sector that may contain the point
- Orientation (cross product) tests determine the final position of the point
- Edge cases are handled carefully to distinguish:
  - interior points
  - boundary points
  - exterior points

### Time Complexity:
- **O(log n)** per point check

This approach is significantly faster than linear edge checks and is well-suited for convex polygons.

---

## 🛠️ Technologies Used

- **Next.js** (React framework)
- **TypeScript**
- **HTML5 Canvas**
- **CSS**

The entire computation is performed on the frontend; no backend or data persistence is required.

---

## ▶️ How to Run the Project

### Prerequisites
- **Node.js ≥ 20.9.0**

- npm

### Steps

```bash
npm install
npm run dev
```
Then open your browser at:
http://localhost:3000

📥 Input Format
Polygon vertices

- One vertex per line
- Supported formats:

   ```bash
   x y
   x,y
   ```


Example:

```bash
0 0
6 0
8 3
6 6
0 6
-2 3
```

### Point

- Enter X and Y manually
- Or click anywhere on the canvas to set the point interactively

## ⚠️ Notes

- The algorithm assumes the polygon is convex
- Supplying a non-convex polygon may lead to incorrect results
- Floating-point precision is handled using a small epsilon tolerance

## 📌 Purpose

This project was created as a **software engineering practice task** to demonstrate:

- algorithmic thinking
- computational geometry knowledge
- clean TypeScript code
- interactive frontend development

## 💡 Solution Idea and Technology Choice

The idea of the solution is to efficiently determine whether a given point lies inside,
outside, or on the boundary of a convex polygon, while also providing a clear visual
representation of the problem.

Instead of using a straightforward linear scan over all polygon edges, the solution
leverages the convexity of the polygon to achieve a logarithmic time complexity.
By fixing one vertex and applying binary search combined with orientation (cross product)
tests, the algorithm locates the relevant triangle sector and determines the position
of the point in O(log n) time.

This approach was chosen because it demonstrates algorithmic thinking and knowledge
of computational geometry, while also being more efficient than the naive O(n) solution.
Special attention was given to correctly handling boundary cases, such as points lying
exactly on polygon edges.

The application is implemented using Next.js and TypeScript. TypeScript provides strong
type safety for geometric primitives such as points and vectors, reducing the likelihood
of logical errors. Next.js and React were selected to quickly build an interactive user
interface and to visually demonstrate the algorithm using an HTML5 canvas.

The interactive visualization allows users to input polygon vertices manually or place
the point directly on the canvas, making the solution both intuitive and easy to test.
This combination of efficient algorithms and clear visualization was chosen to best
demonstrate both problem-solving skills and practical software engineering abilities.

## 👤 Author

**Dmitar Štrbac**