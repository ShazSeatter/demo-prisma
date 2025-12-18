-- CreateTable
CREATE TABLE "JobPerformance" (
    "id" SERIAL NOT NULL,
    "review" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "JobPerformance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JobPerformance" ADD CONSTRAINT "JobPerformance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
