### Assignment #1

## Project Overview

This project implements a **Discount Module** designed to accurately calculate the final price of items in a shopping cart after applying various discount campaigns. The module rigorously adheres to specific business rules regarding discount application order and exclusivity, as outlined in the assignment brief.

The primary goal is to provide a robust backend logic for price calculation, ensuring correct application of complex promotional rules.

## Technologies Used

* **Framework:** Vue.js (with Vite)
* **Language:** TypeScript
* **State Management:** Pinia
* **Styling:** Tailwind CSS
* **Icons:** Tabler Icons
## Features & Implemented Discount Types

This module supports the following discount campaign types, categorized and applied according to the specified rules:

### **Campaign Categories & Rules:**

1.  **Exclusivity:** Only **one campaign per category type** (Coupon, On Top, Seasonal) can be applied. (The module assumes the input `selected_discount_campaigns` already reflects this selection, or an internal prioritization handles it – *see "Assumptions" for details*).
2.  **Application Order:** Discount campaigns are applied in a strict sequence:
    * 1. Coupon
    * 2. On Top
    * 3. Seasonal

### **Implemented Discount Rules:**

* **Coupon Category:**
    * `Fixed Amount`: Deducts a fixed amount from the total cart price.
    * `Percentage Discount`: Deducts a percentage from the total cart price.
* **On Top Category:**
    * `Percentage Discount by Item Category`: Deducts a percentage from the price of items belonging to a specified category within the cart.
    * `Discount by Points`: Allows users to redeem loyalty points for a discount, with a maximum cap of 20% of the total cart price. (1 point = 1 THB)
* **Seasonal Category:**
    * `Special Campaigns`: Deducts a fixed amount (Y THB) for every multiple of a certain total price (X THB).

## Setup Project

1.  **Clone the repository:**
    ```bash
    git clone [Your Repository URL Here]
    cd [your-repo-name]
    ```
2.  **Install dependencies:**
    ```bash
    npm install # or npm i
    ```

## Usage

1.  **Run the Project (Demo UI/Application):**
    ```bash
    npm run dev
    ```
2.  **Access in Browser:**
    Open your web browser and navigate to `http://localhost:5173/`

3.  **Setup Campaigns (via UI):**
    * On the browser page (`http://localhost:5173/`), navigate to the "Campaign Editor" (or similar section).
    * Set up and activate the desired discount campaigns.

### **Author**

    Thanat Roongjakrwal
    
    workflow and wireframe: https://excalidraw.com/#json=1pBULMMoEfJ8lLgXV0Ccx,vJfckzS9ECrPGtfd8DVQWQ