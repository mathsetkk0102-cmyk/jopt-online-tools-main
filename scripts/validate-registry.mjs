import fs from 'node:fs';

const file = new URL('../tools.json', import.meta.url);
const allowedCourses = new Set([
  '중1', '중2', '중3', '고1', '대수', '미적분Ⅰ', '미적분Ⅱ', '확률과 통계', '기하'
]);
const errors = [];
let tools;

try {
  tools = JSON.parse(fs.readFileSync(file, 'utf8'));
} catch (error) {
  console.error(`tools.json 파싱 실패: ${error.message}`);
  process.exit(1);
}

if (!Array.isArray(tools)) {
  errors.push('최상위 값은 배열이어야 합니다.');
} else {
  const ids = new Set();
  tools.forEach((tool, i) => {
    const p = `tools[${i}]`;
    if (!tool || typeof tool !== 'object' || Array.isArray(tool)) {
      errors.push(`${p}: 객체여야 합니다.`);
      return;
    }
    if (typeof tool.id !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(tool.id)) {
      errors.push(`${p}.id: 영문 소문자/숫자 kebab-case가 필요합니다.`);
    } else if (ids.has(tool.id)) {
      errors.push(`${p}.id: 중복 id '${tool.id}'`);
    } else {
      ids.add(tool.id);
    }
    if (typeof tool.title !== 'string' || !tool.title.trim()) errors.push(`${p}.title: 비어 있을 수 없습니다.`);
    if (!allowedCourses.has(tool.course)) errors.push(`${p}.course: 허용되지 않은 과목 '${tool.course}'`);
    if (tool.unit != null && typeof tool.unit !== 'string') errors.push(`${p}.unit: 문자열이어야 합니다.`);
    if (typeof tool.description !== 'string') errors.push(`${p}.description: 문자열이어야 합니다.`);
    if (typeof tool.url !== 'string' || !/^https?:\/\//i.test(tool.url)) errors.push(`${p}.url: http(s) URL이 필요합니다.`);
    if (typeof tool.isNew !== 'boolean') errors.push(`${p}.isNew: boolean이어야 합니다.`);
    if (typeof tool.enabled !== 'boolean') errors.push(`${p}.enabled: boolean이어야 합니다.`);
    if (typeof tool.order !== 'number' || !Number.isFinite(tool.order)) errors.push(`${p}.order: 유한한 숫자여야 합니다.`);
  });
}

if (errors.length) {
  console.error('Registry 검증 실패:\n- ' + errors.join('\n- '));
  process.exit(1);
}

console.log(`Registry 검증 통과: ${tools.length}개 교구`);
