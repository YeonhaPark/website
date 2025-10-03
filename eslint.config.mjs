import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import { ReactThreeFiber } from "@react-three/fiber";
it;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "react/no-unknown-property": "off", // 알 수 없는 prop 사용 시 경고
      // 추가하고 싶은 규칙들을 여기에 넣으세요
    },
  },
  {
    // Three.js 관련 파일에는 더 관대한 규칙 적용
    plugins: { "@react-three": ReactThreeFiber },
  },
];

export default eslintConfig;
