# Mission 11 - Step-by-Step Learning Guide

This guide will walk you through building an online bookstore web app with an ASP.NET Core API backend and a React (Vite + TypeScript) frontend. Each step teaches a concept and then asks you to apply it.

---

## Step 1: Download and Explore the Database

**What you're learning:** How SQLite databases work and how to inspect their structure.

1. Download the `.sqlite` database file from the link provided in the assignment PDF.
2. Place the downloaded `.sqlite` file somewhere inside your `backend/` folder (a common spot is the project root, e.g., `backend/Mission11_LaTour/`).
3. Open the database using a tool like **DB Browser for SQLite** (free) or the **SQLite extension in VS Code** to see the table(s) and columns inside.
4. Write down the exact table name and every column name + data type. You'll need these to match perfectly in your C# model.

**Key question to answer before moving on:** What is the table called, and what are the column names and types?

---

## Step 2: Install the NuGet Packages You Need

**What you're learning:** How Entity Framework Core connects your C# code to a database.

Entity Framework Core (EF Core) is an **ORM** (Object-Relational Mapper) -- it lets you work with database rows as C# objects instead of writing raw SQL.

1. Open a terminal in your backend project folder (`backend/Mission11_LaTour/`).
2. You need two packages:
   - `Microsoft.EntityFrameworkCore.Sqlite` -- the SQLite database provider
   - `Microsoft.EntityFrameworkCore.Design` -- tooling support (migrations, etc.)
3. Research how to install NuGet packages via the `dotnet` CLI using `dotnet add package <PackageName>`.
4. Install both packages.

**Key question:** After installing, check your `.csproj` file. Do you see the new `<PackageReference>` entries?

---

## Step 3: Create the Book Model

**What you're learning:** How a C# class maps to a database table (the "M" in MVC).

A **model** is a C# class where each property corresponds to a column in your database table.

1. Create a `Models/` folder inside your backend project.
2. Create a new file called `Book.cs` inside `Models/`.
3. Define a class with properties that **exactly match** the column names and types from the database you inspected in Step 1. Think about:
   - What C# type corresponds to a text column? An integer column? A decimal/money column?
   - Which property serves as the **primary key**? (Look for an `Id`-type column.)
   - The assignment says all fields are required -- research the `[Required]` data annotation attribute from `System.ComponentModel.DataAnnotations`.
4. If any column names in the database use conventions that differ from C# naming (e.g., spaces or different casing), look into the `[Column("...")]` attribute to map them.

**Key question:** Does every property in your model have a matching column in the database?

---

## Step 4: Create the DbContext

**What you're learning:** How EF Core uses a `DbContext` to manage the connection between your app and the database.

A `DbContext` is the main class that coordinates EF Core functionality for your data model. Think of it as the "bridge" between your C# code and the database.

1. Create a `Data/` folder in your backend project.
2. Create a file called `BookDbContext.cs` (or similar).
3. This class should:
   - Inherit from `DbContext`
   - Have a constructor that accepts `DbContextOptions<YourContextName>` and passes it to the base class
   - Have a `DbSet<Book>` property -- this represents the table of books
4. Research what a `DbSet<T>` is and why it's important. In short: each `DbSet` maps to a table.

**Key question:** What does `DbSet<Book>` actually represent at runtime?

---

## Step 5: Wire Up the Database in Program.cs

**What you're learning:** How ASP.NET Core's **dependency injection** system provides services to your app.

1. Open `Program.cs`.
2. You need to register your `DbContext` with the dependency injection container so the rest of your app can use it. Research how to use `builder.Services.AddDbContext<T>()`.
3. Inside that call, configure it to use SQLite with a **connection string** pointing to your downloaded `.sqlite` file. The connection string format for SQLite is: `"Data Source=path/to/your/file.sqlite"`.
4. You'll also want to add **CORS** (Cross-Origin Resource Sharing) so your React frontend (running on a different port) can call your API. Research `builder.Services.AddCors()` and `app.UseCors()`. You'll need to allow your frontend's origin (Vite defaults to `http://localhost:5173`).

**Key question:** Why do you need CORS? What happens if you skip it and your React app tries to call the API?

---

## Step 6: Create the API Controller

**What you're learning:** How controllers handle HTTP requests and return data.

A **controller** is a class that receives HTTP requests and sends back responses. ASP.NET Core uses attributes like `[HttpGet]` to map URLs to methods.

1. Look at the existing `Controllers/` folder for an example (there's likely a `WeatherForecastController`).
2. Create a new controller file, e.g., `BookController.cs`.
3. Your controller should:
   - Use the `[ApiController]` and `[Route("[controller]")]` attributes
   - Accept your `DbContext` via **constructor injection**
   - Have a `GET` endpoint that returns books from the database
4. **Pagination matters here.** Think about what the frontend will need:
   - The current page number
   - How many books per page (page size)
   - The total number of books (so the frontend knows how many pages exist)
5. Research LINQ methods like `.Skip()` and `.Take()` -- these are how you paginate in EF Core.
6. Consider: should sorting happen here on the backend, or on the frontend? (Hint: sorting on the backend with `.OrderBy()` is more scalable.)
7. Think about what shape your response should be. You'll likely want to return an **object** containing both the list of books AND the total count (so the frontend can calculate total pages).

**Key question:** If you have 20 books and the user wants page 3 with 5 books per page, how many would you `.Skip()` and how many would you `.Take()`?

---

## Step 7: Test Your API

**What you're learning:** How to verify your backend works before building the frontend.

1. Run your backend project (`dotnet run` from the backend project folder).
2. Use a tool to test your API endpoint:
   - **Browser:** Navigate to `https://localhost:<port>/Book` (or whatever your route is)
   - **Swagger/OpenAPI:** Your project already has OpenAPI configured -- check if there's a Swagger UI endpoint
   - **Postman or curl:** Send a GET request to your endpoint
3. Verify you see book data coming back as JSON.
4. Test with query parameters for pagination (e.g., `?pageNum=1&pageSize=5`).

**Key question:** Does the JSON response contain both the book data AND the total count?

---

## Step 8: Set Up the React Frontend

**What you're learning:** How to fetch data from an API in React.

Your frontend is already scaffolded with Vite + React + TypeScript. Now you need to connect it to your API.

1. **Install Bootstrap** for styling. Use `npm install bootstrap` in the `frontend/` directory, then import it in `main.tsx`: `import 'bootstrap/dist/css/bootstrap.min.css'`.
2. **Define a TypeScript interface** for a Book. Create a file like `types/Book.ts` that describes the shape of a book object (matching what your API returns). This gives you type safety.

**Key question:** Why is defining a TypeScript interface helpful compared to just using `any`?

---

## Step 9: Build the BookList Component

**What you're learning:** React state management, useEffect for data fetching, and rendering lists.

1. Create a new component file, e.g., `components/BookList.tsx`.
2. Think about what **state** you need:
   - The list of books (from the API)
   - The current page number
   - The number of results per page
   - The total number of books (for calculating page count)
   - Whether sorting is active
3. Use the `useEffect` hook to fetch data from your API whenever the page number, page size, or sort order changes. Research:
   - `fetch()` or install `axios` -- either works for making HTTP requests
   - The `useEffect` dependency array -- what should trigger a re-fetch?
   - `useState` for managing each piece of state
4. Render the books. You could use:
   - A **table** (`<table className="table table-striped">` with Bootstrap)
   - Or **cards** -- your choice, but make sure all 7 fields are displayed
5. Map over your books array to render each one.

**Key question:** What goes in the `useEffect` dependency array, and why?

---

## Step 10: Add Pagination Controls

**What you're learning:** How to build interactive UI that controls data fetching.

1. Calculate the total number of pages: `Math.ceil(totalBooks / pageSize)`.
2. Render pagination buttons. Bootstrap has a `pagination` component class you can use.
3. Think about:
   - A "Previous" button (disabled on page 1)
   - Numbered page buttons
   - A "Next" button (disabled on the last page)
4. Each button should update the page state, which triggers `useEffect` to re-fetch.
5. Add a **dropdown or input** that lets the user change how many results appear per page (e.g., 5, 10, 15). When this changes, reset to page 1.

**Key question:** Why should you reset to page 1 when the user changes the page size?

---

## Step 11: Add Sort-by-Title Functionality

**What you're learning:** How to pass sorting parameters from the frontend to the backend.

This feature is intentionally not covered in the class videos -- the assignment wants you to figure it out!

1. **Backend:** Add a query parameter to your controller endpoint (e.g., `sortOrder` or `sortBy`). Use LINQ's `.OrderBy()` or `.OrderByDescending()` to sort the results before paginating.
2. **Frontend:** Add a button or clickable table header on "Title" that toggles between ascending/descending sort. Store the sort direction in state.
3. When the sort state changes, include it as a query parameter in your API call and add it to your `useEffect` dependency array.

**Key question:** Should you sort *before* or *after* applying `.Skip()` and `.Take()` in your backend? Why does the order matter?

---

## Step 12: Add the Component to App.tsx

**What you're learning:** How React components compose together.

1. Import your `BookList` component into `App.tsx`.
2. Render it inside the return statement. Consider adding a header/title for the page using Bootstrap typography classes.

---

## Step 13: Style with Bootstrap

**What you're learning:** Using a CSS framework for clean, responsive layouts.

1. Wrap your main content in a Bootstrap `container` div.
2. Explore Bootstrap classes to make things look polished:
   - `table`, `table-striped`, `table-hover` for tables
   - `btn`, `btn-primary`, `btn-outline-secondary` for buttons
   - `pagination`, `page-item`, `page-link` for pagination
   - `mb-3`, `mt-4`, `text-center` for spacing and alignment
3. Make sure the page looks clean and readable.

---

## Step 14: Final Testing and Cleanup

1. Run both backend and frontend simultaneously.
2. Walk through these checks:
   - [ ] All 7 book fields are displayed for each book
   - [ ] Pagination shows 5 books per page by default
   - [ ] You can navigate between pages
   - [ ] You can change the number of results per page
   - [ ] Sorting by title works (ascending and descending)
   - [ ] The page is styled with Bootstrap
3. Remove the default `WeatherForecast.cs` and `WeatherForecastController.cs` if you want a clean project.

---

## Step 15: Push to GitHub and Submit

1. Make sure you have a `.gitignore` that excludes `node_modules/`, `bin/`, `obj/`, and the `.sqlite` file (or include it if your professor expects it -- check with them).
2. Initialize a git repo if you haven't already, commit your work, and push to GitHub.
3. Submit the repo link on Learning Suite.

---

## Quick Reference: Key Concepts

| Concept | What It Means |
|---|---|
| **EF Core** | ORM that maps C# classes to database tables |
| **DbContext** | The bridge between your code and the database |
| **DbSet\<T\>** | Represents a table you can query |
| **LINQ (.Skip/.Take/.OrderBy)** | Methods to query and manipulate data |
| **Dependency Injection** | ASP.NET gives your classes what they need automatically |
| **CORS** | Security policy that controls which origins can call your API |
| **useState / useEffect** | React hooks for managing state and side effects |
| **Pagination** | Splitting results into pages instead of loading everything |

Good luck -- you've got this!
