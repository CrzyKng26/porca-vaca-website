import re
html_path = r'C:\Users\kanna\.gemini\antigravity\brain\006eba70-5cf0-4b61-ad4d-810450d9b022\scratch\svg_payload.html'
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

path_match = re.search(r'<path.*?>', html, re.DOTALL | re.IGNORECASE).group(0)

path_cleaned = path_match.replace('fill-rule=', 'fillRule=').replace('clip-rule=', 'clipRule=').replace('stroke-width=', 'strokeWidth=').replace('stroke-linecap=', 'strokeLinecap=').replace('stroke-linejoin=', 'strokeLinejoin=')
path_cleaned = re.sub(r'class="[^"]*"', '', path_cleaned)

def write_comp(name, viewBox):
    comp = f'''import React from "react";\n\nexport function {name}({{ className = "" }}: {{ className?: string }}) {{\n  return (\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="{viewBox}" className={{className}} width="100%" height="100%">\n      {path_cleaned}\n    </svg>\n  );\n}}\n'''
    with open(f'components/ui/{name}.tsx', 'w', encoding='utf-8') as f:
        f.write(comp)
    print(f'Wrote {name}')

write_comp('PorcaIcon', '0 0 1874.25 1493.26')
write_comp('VacaIcon', '1874.25 0 1874.25 1493.26')
