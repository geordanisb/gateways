-- CreateTable
CREATE TABLE "gateways" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "serial" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ipv4" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "peripherals" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uid" INTEGER NOT NULL,
    "vendor" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "gateway_id" INTEGER NOT NULL,
    CONSTRAINT "peripherals_gateway_id_fkey" FOREIGN KEY ("gateway_id") REFERENCES "gateways" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "gateways_serial_key" ON "gateways"("serial");

-- CreateIndex
CREATE UNIQUE INDEX "gateways_ipv4_key" ON "gateways"("ipv4");

-- CreateIndex
CREATE INDEX "gateway_name_index" ON "gateways"("name");

-- CreateIndex
CREATE UNIQUE INDEX "peripherals_uid_key" ON "peripherals"("uid");

-- CreateIndex
CREATE INDEX "peripheral_gateway_id_index" ON "peripherals"("gateway_id");

-- CreateIndex
CREATE INDEX "peripheral_uid_index" ON "peripherals"("uid");
