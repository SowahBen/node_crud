const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");
const app = express();
const port = 3000; // or any port you prefer

// Configure middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Create MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_node_contact",
});

// Connect to MySQL
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

// Define routes
app.get("/", (req, res) => {
  res.render("index");
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Handle form submission
app.post("/add-contact", (req, res) => {
  const { firstName, lastName, phoneNumber, dob } = req.body;
  console.log("Received request body:", req.body);
  // Log lastName
  console.log("Last Name:", lastName);

  if (!firstName || !lastName || !phoneNumber || !dob) {
    res.status(400).send("All fields are required.");
    return;
  }

  const formData = {
    first_name: firstName,
    last_name: lastName,
    phone_number: phoneNumber,
    dob,
  };

  // Insert data into MySQL database
  connection.query("INSERT INTO tb_contact SET ?", formData, (err, result) => {
    if (err) {
      console.error("Error inserting data into database:", err);
      res.status(500).send(`Error submitting data: ${err.message}`); // Include error message in response
      return;
    }
    console.log("Data inserted successfully:", result);
    res.status(200).json({ message: "Data submitted successfully." });
    //res.redirect("/index.html");
  });
});

// Handle GET request to fetch contact data
app.get("/contacts", (req, res) => {
  // Query to select all contacts from the database
  connection.query("SELECT * FROM tb_contact WHERE del = 0", (err, results) => {
    if (err) {
      console.error("Error fetching contacts:", err);
      res
        .status(500)
        .json({ message: "Error fetching contacts. Please try again later." });
      return;
    }
    // Render the contacts view and pass the fetched data
    res.render("contacts", { contacts: results });
  });
});

// Set the view engine to EJS
app.set("view engine", "ejs");
// Set the views directory
app.set("views", path.join(__dirname, "views"));

// Handle GET request to display edit form for a specific contact
app.get("/edit", (req, res) => {
  const { id } = req.query;
  // Fetch the contact data based on the ID and render the edit form
  connection.query(
    "SELECT * FROM tb_contact WHERE ID = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error("Error fetching contact:", err);
        res
          .status(500)
          .json({ message: "Error fetching contact. Please try again later." });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ message: "Contact not found." });
        return;
      }

      const contact = results[0];

      // Convert the date string to a JavaScript Date object
      const dateObject = new Date(contact.dob);

      // Format the date to "yyyy-MM-dd" format
      const formattedDate = dateObject.toISOString().split("T")[0];

      // Pass the formatted date to the template
      res.render("edit", { contact: { ...contact, dob: formattedDate } });
    }
  );
});

// Handle POST request to update contact details
app.post("/update", (req, res) => {
  const { id, firstName, lastName, phoneNumber, dob } = req.body;
  const updatedData = {
    first_name: firstName,
    last_name: lastName,
    phone_number: phoneNumber,
    dob: dob,
  };
  console.log("Body: ", req.body);
  // Update the contact data in the database
  connection.query(
    "UPDATE tb_contact SET ? WHERE ID = ?",
    [updatedData, id],
    (err, results) => {
      if (err) {
        console.error("Error updating contact:", err);
        res.status(500).send("Error updating contact. Please try again later.");
        return;
      } else if (results.affectedRows >= 1) {
        // Checked if affectedRows is greater than or equal to 1

        res.json({ message: "Contact deleted successfully" });

        // Redirect to the contacts page or perform any other action
        //res.redirect("/contacts"); // Redirect to contact list after update
      }
    }
  );
});

// Handle DELETE request to delete a specific contact
app.delete("/delete", (req, res) => {
  const { id } = req.query;
  const updatedData = {
    del: 1,
  };
  // Delete the contact based on the ID
  connection.query(
    "UPDATE tb_contact SET ? WHERE ID = ?",
    [updatedData, id],
    (err, results) => {
      if (err) {
        console.error("Error deleting contact:", err);
        res
          .status(500)
          .json({ error: "Error deleting contact. Please try again later." });
        return;
      }
      res.json({ message: "Contact deleted successfully" });
    }
  );
});
