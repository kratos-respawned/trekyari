import { sql } from "drizzle-orm";
import {
  boolean,
  date,
  integer,
  pgTable,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `sdf_${name}`);

// User table
export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  firstName: varchar("firstName").notNull(),
  lastName: varchar("lastName").notNull(),
  email: varchar("email").notNull(),
  phoneNumber: varchar("phoneNumber").notNull(),
  password: varchar("password").notNull(),
  roleId: integer("roleId")
    .notNull()
    .default(sql`1`),
  createdAt: timestamp("createdAt")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .default(sql`now()`),
});

// Trek table
export const trek = pgTable("trek", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  state: varchar("state").notNull(),
  location: varchar("location").notNull(),
  duration: varchar("duration").notNull(),
  description: varchar("description").notNull(),
  altitude: varchar("altitude").notNull(),
  bestTime: varchar("bestTime").notNull(),
  pickupPoint: varchar("pickupPoint").notNull(),
  difficultyLevel: varchar("difficultyLevel").notNull(),
  createdAt: timestamp("createdAt")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .default(sql`now()`),
  defaultSlots: integer("defaultSlots").notNull(),
  defaultBookingAmount: integer("defaultBookingAmount").notNull(),
  defaultTotalAmount: integer("defaultTotalAmount").notNull(),
});

// Booking table
export const booking = pgTable("booking", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  amount: integer("amount").notNull(),
  paymentStatus: varchar("paymentStatus").notNull(),
  razopayOrderId: varchar("razopayOrderId"),
  couponId: integer("couponId"),
  createdAt: timestamp("createdAt")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .default(sql`now()`),
  slotId: integer("slotId").notNull(),
  slotsBooked: integer("slotsBooked").notNull(),
  bookingAmount: integer("bookingAmount").notNull(),
  amountPaid: integer("amountPaid").notNull(),
  scheduleId: integer("scheduleId").notNull(),
  scheduleDate: integer("scheduleDate").notNull(),
  cancelled: boolean("cancelled").notNull(),
});

// Razorpay Order table
export const razorpayOrder = pgTable("razorpay_order", {
  id: serial("id").primaryKey(),
  orderId: varchar("orderId").notNull(),
  entity: varchar("entity").notNull(),
  userId: integer("userId").notNull(),
  amount: integer("amount").notNull(),
  amountPaid: integer("amountPaid"),
  amountDue: integer("amountDue"),
  currency: varchar("currency").notNull(),
  receipt: varchar("receipt"),
  status: varchar("status"),
  attempts: integer("attempts").notNull(),
  createdAt: timestamp("createdAt")
    .notNull()
    .default(sql`now()`),
  razorpayPaymentId: varchar("razorpayPaymentId"),
  razorpayOrderId: varchar("razorpayOrderId"),
  razorpayPaymentSignature: varchar("razorpayPaymentSignature"),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .default(sql`now()`),
});

// Schedule table
export const schedule = pgTable("schedule", {
  id: serial("id").primaryKey(),
  trekId: integer("trekId").notNull(),
  scheduleDate: date("scheduleDate").notNull(),
  scheduleType: varchar("scheduleType")
    .notNull()
    .default(sql`'REGULAR'`),
  createdAt: timestamp("createdAt")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .default(sql`now()`),
  bookingAmount: integer("bookingAmount").notNull(),
  totalAmount: integer("totalAmount").notNull(),
});

// Member table
export const member = pgTable("member", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("createdAt")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .default(sql`now()`),
  bookingId: integer("bookingId").notNull(),
  name: varchar("name").notNull(),
  age: varchar("age").notNull(),
  title: varchar("title").notNull(),
});

// Featured table
export const featured = pgTable("featured", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("createdAt")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .default(sql`now()`),
  trekId: integer("trekId").notNull(),
  active: boolean("active")
    .notNull()
    .default(sql`true`),
  type: varchar("type").notNull(),
});

// Slot table
export const slot = pgTable("slot", {
  id: serial("id").primaryKey(),
  scheduleId: integer("scheduleId").notNull(),
  totalSlots: integer("totalSlots").notNull(),
  availableSlots: integer("availableSlots").notNull(),
  createdAt: timestamp("createdAt")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .default(sql`now()`),
});

// Booking Slots table
export const bookingSlots = pgTable("booking_slots", {
  id: serial("id").primaryKey(),
  slotId: integer("slotId").notNull(),
  bookingId: integer("bookingId").notNull(),
  memberId: integer("memberId").notNull(),
  cancelled: boolean("cancelled").notNull(),
  createdAt: timestamp("createdAt")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .default(sql`now()`),
});

// Discount table
export const discount = pgTable("discount", {
  id: serial("id").primaryKey(),
  bookingAmount: integer("bookingAmount").notNull(),
  bookingId: integer("bookingId").notNull(),
  discountAmount: integer("discountAmount").notNull(),
  paymentAmount: integer("paymentAmount").notNull(),
  discountType: varchar("discountType").notNull(),
  createdAt: timestamp("createdAt")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .default(sql`now()`),
});

// Inventory Item table
export const inventoryItem = pgTable("inventory_item", {
  id: serial("id").primaryKey(),
  type: varchar("type").notNull(),
  description: varchar("description").notNull(),
  rentalPrice: integer("rentalPrice").notNull(),
  cost: integer("cost").notNull(),
  security: integer("security").notNull(),
  quantity: integer("quantity").notNull(),
  usedQty: integer("usedQty").notNull(),
  createdAt: timestamp("createdAt")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .default(sql`now()`),
});

// Trainer table
export const trainer = pgTable("trainer", {
  id: serial("id").primaryKey(),
  firstName: varchar("firstName").notNull(),
  lastName: varchar("lastName").notNull(),
  trainerTitle: varchar("trainerTitle").notNull(),
  certificate: varchar("certificate").notNull(),
  homeState: varchar("homeState").notNull(),
  bio: varchar("bio").notNull(),
  age: integer("age").notNull(),
  imageUrl: varchar("imageUrl").notNull(),
  createdAt: timestamp("createdAt")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .default(sql`now()`),
});
