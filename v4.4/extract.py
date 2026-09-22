import os
import re

html_path = r'C:\Users\kanna\.gemini\antigravity\brain\006eba70-5cf0-4b61-ad4d-810450d9b022\scratch\svg_payload.html'
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

svgs = re.findall(r'(<svg.*?</svg>)', html, re.DOTALL)

def make_react_component(name, svg_str):
    # Fix the svg tag to have className
    svg_str = re.sub(r'<svg([^>]*)>', r'<svg\1 className={className}>', svg_str)
    # Remove old class attr
    svg_str = re.sub(r'class="[^"]*"', '', svg_str)
    
    # Camel case standard attrs
    svg_str = svg_str.replace('fill-rule=', 'fillRule=').replace('clip-rule=', 'clipRule=').replace('stroke-width=', 'strokeWidth=').replace('stroke-linecap=', 'strokeLinecap=').replace('stroke-linejoin=', 'strokeLinejoin=').replace('viewbox=', 'viewBox=')
    
    comp = f'''import React from "react";\n\nexport function {name}({{ className = "" }}: {{ className?: string }}) {{\n  return (\n    {svg_str}\n  );\n}}\n'''
    return comp

for i, svg in enumerate(svgs):
    name = 'PorcaIcon' if i == 0 else 'VacaIcon'
    
    out_path = f'components/ui/{name}.tsx'
    os.makedirs('components/ui', exist_ok=True)
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(make_react_component(name, svg))
    print(f'Wrote {out_path}')
