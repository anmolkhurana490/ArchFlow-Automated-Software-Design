from io import BytesIO
from markdown import markdown
from xhtml2pdf import pisa

# File utilities for generating files in memory

def generate_text_file(content: str):
    file_like = BytesIO(content.encode('utf-8'))
    return file_like

def generate_pdf_file(content: str):
    # Convert Markdown -> HTML
    html_content = markdown(content, extensions=['extra', 'codehilite'])
    styled_html = HTML_TEMPLATE.format(markdown_html=html_content)

    # Convert HTML -> PDF
    pdf_file = BytesIO()
    pisa.CreatePDF(styled_html, pdf_file)
    pdf_file.seek(0)

    return pdf_file


HTML_TEMPLATE = """
    <html>
    <head>
        <style>
            h2 {{
                border-top: 1px solid #000;
                padding-top: 20px;
            }}
            ul {{
                margin-bottom: 5px;
            }}
        </style>
    </head>
    <body>
        {markdown_html}
    </body>
    </html>
    """