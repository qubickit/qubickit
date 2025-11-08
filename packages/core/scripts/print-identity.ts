import { createIdentityPackage } from '../src/wallet/identity';

const seed = process.argv[2];
createIdentityPackage(seed)
  .then((pkg) => console.log(pkg.identity))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
