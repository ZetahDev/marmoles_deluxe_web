/**
 * Script para probar la generación de firma de integridad de Wompi
 * Ejecutar con: node scripts/test-integrity-signature.js
 */

import crypto from "crypto";

// Datos de prueba
const testData = {
  reference: "ANT-1731661234567-TEST01",
  amountInCents: 50000000, // $500,000 COP
  currency: "COP",
  integritySecret: "test_integrity_RUD1ovw1E20Fvx4GhojiOGvyXtBrlGiv",
};

console.log("🧪 TEST DE FIRMA DE INTEGRIDAD WOMPI\n");
console.log("=".repeat(70));

console.log("\n📋 Datos de entrada:");
console.log(`  Reference: ${testData.reference}`);
console.log(
  `  Amount: ${testData.amountInCents} centavos ($${
    testData.amountInCents / 100
  } COP)`
);
console.log(`  Currency: ${testData.currency}`);
console.log(
  `  Integrity Secret: ${testData.integritySecret.substring(0, 20)}...`
);

// Construir string de firma
const signatureString = `${testData.reference}${testData.amountInCents}${testData.currency}${testData.integritySecret}`;

console.log("\n🔤 String para firma:");
console.log(`  ${signatureString.substring(0, 80)}...`);
console.log(`  Longitud: ${signatureString.length} caracteres`);

// Generar hash SHA256
const hash = crypto.createHash("sha256").update(signatureString).digest("hex");

console.log("\n🔐 Firma SHA256 generada:");
console.log(`  ${hash}`);

// Construir URL completa de ejemplo
const params = new URLSearchParams({
  "public-key": "pub_test_ryHKciVu9fYxH5ga7fe26G9v1u0vFb8o",
  currency: testData.currency,
  "amount-in-cents": testData.amountInCents.toString(),
  reference: testData.reference,
  "redirect-url": "http://localhost:4321/confirmacion-pago",
  "customer-data:email": "test@example.com",
  "customer-data:full-name": "Juan Pérez",
  "customer-data:phone-number": "3001234567",
  "signature:integrity": hash,
});

const url = `https://checkout.wompi.co/card?${params.toString()}`;

console.log("\n🔗 URL de pago completa:");
console.log(`  ${url}`);

console.log("\n✅ Verificaciones:");
console.log(
  `  ✓ URL contiene 'signature:integrity': ${url.includes(
    "signature:integrity"
  )}`
);
console.log(`  ✓ URL usa '/card': ${url.includes("/card?")}`);
console.log(`  ✓ Firma tiene 64 caracteres (SHA256): ${hash.length === 64}`);

console.log("\n" + "=".repeat(70));
console.log(
  "✅ Test completado - Copia la URL de arriba para probar en Wompi\n"
);
