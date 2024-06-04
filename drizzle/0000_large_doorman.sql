CREATE TABLE IF NOT EXISTS "booking" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"amount" integer NOT NULL,
	"paymentStatus" varchar NOT NULL,
	"razopayOrderId" varchar,
	"couponId" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"slotId" integer NOT NULL,
	"slotsBooked" integer NOT NULL,
	"bookingAmount" integer NOT NULL,
	"amountPaid" integer NOT NULL,
	"scheduleId" integer NOT NULL,
	"scheduleDate" integer NOT NULL,
	"cancelled" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "booking_slots" (
	"id" serial PRIMARY KEY NOT NULL,
	"slotId" integer NOT NULL,
	"bookingId" integer NOT NULL,
	"memberId" integer NOT NULL,
	"cancelled" boolean NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "discount" (
	"id" serial PRIMARY KEY NOT NULL,
	"bookingAmount" integer NOT NULL,
	"bookingId" integer NOT NULL,
	"discountAmount" integer NOT NULL,
	"paymentAmount" integer NOT NULL,
	"discountType" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "featured" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"trekId" integer NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"type" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "inventory_item" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" varchar NOT NULL,
	"description" varchar NOT NULL,
	"rentalPrice" integer NOT NULL,
	"cost" integer NOT NULL,
	"security" integer NOT NULL,
	"quantity" integer NOT NULL,
	"usedQty" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "member" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"bookingId" integer NOT NULL,
	"name" varchar NOT NULL,
	"age" varchar NOT NULL,
	"title" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "razorpay_order" (
	"id" serial PRIMARY KEY NOT NULL,
	"orderId" varchar NOT NULL,
	"entity" varchar NOT NULL,
	"userId" integer NOT NULL,
	"amount" integer NOT NULL,
	"amountPaid" integer,
	"amountDue" integer,
	"currency" varchar NOT NULL,
	"receipt" varchar,
	"status" varchar,
	"attempts" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"razorpayPaymentId" varchar,
	"razorpayOrderId" varchar,
	"razorpayPaymentSignature" varchar,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "schedule" (
	"id" serial PRIMARY KEY NOT NULL,
	"trekId" integer NOT NULL,
	"scheduleDate" date NOT NULL,
	"scheduleType" varchar DEFAULT 'REGULAR' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"bookingAmount" integer NOT NULL,
	"totalAmount" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "slot" (
	"id" serial PRIMARY KEY NOT NULL,
	"scheduleId" integer NOT NULL,
	"totalSlots" integer NOT NULL,
	"availableSlots" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "trainer" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstName" varchar NOT NULL,
	"lastName" varchar NOT NULL,
	"trainerTitle" varchar NOT NULL,
	"certificate" varchar NOT NULL,
	"homeState" varchar NOT NULL,
	"bio" varchar NOT NULL,
	"age" integer NOT NULL,
	"imageUrl" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "trek" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"state" varchar NOT NULL,
	"location" varchar NOT NULL,
	"duration" varchar NOT NULL,
	"description" varchar NOT NULL,
	"altitude" varchar NOT NULL,
	"bestTime" varchar NOT NULL,
	"pickupPoint" varchar NOT NULL,
	"difficultyLevel" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"defaultSlots" integer NOT NULL,
	"defaultBookingAmount" integer NOT NULL,
	"defaultTotalAmount" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstName" varchar NOT NULL,
	"lastName" varchar NOT NULL,
	"email" varchar NOT NULL,
	"phoneNumber" varchar NOT NULL,
	"password" varchar NOT NULL,
	"roleId" integer DEFAULT 1 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
