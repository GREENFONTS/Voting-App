-- CreateTable
CREATE TABLE "admin" (
    "firstName" STRING NOT NULL,
    "lastName" STRING NOT NULL,
    "userName" STRING NOT NULL,
    "tel" STRING NOT NULL,
    "organization" STRING NOT NULL,
    "email" STRING NOT NULL,
    "password" STRING NOT NULL,
    "id" STRING NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "position" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "user" STRING NOT NULL,

    CONSTRAINT "position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nominee" (
    "name" STRING NOT NULL,
    "post" STRING NOT NULL,
    "votes" INT4 NOT NULL,
    "id" STRING NOT NULL,
    "postNo" INT4 NOT NULL,
    "user" STRING NOT NULL,
    "image" STRING NOT NULL,

    CONSTRAINT "Nominee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coupons" (
    "codes" STRING NOT NULL,
    "used" BOOL NOT NULL,
    "user" STRING NOT NULL,

    CONSTRAINT "Coupons_pkey" PRIMARY KEY ("codes")
);

-- CreateTable
CREATE TABLE "Election" (
    "state" BOOL NOT NULL,
    "user" STRING NOT NULL,

    CONSTRAINT "Election_pkey" PRIMARY KEY ("user")
);
