#!/bin/bash

# TEVANOXMOVIE - Updated Project Structure Analysis Script
# This script analyzes the actual project structure

PROJECT_ROOT="${PWD}"
OUTPUT_FILE="project_structure_analysis_updated.txt"
HTML_OUTPUT="project_structure_report_updated.html"

# Colors for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# Function to print colored output
print_colored() {
    echo -e "${2}${1}${NC}"
}

clear
print_colored "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" "$CYAN"
print_colored "   🎬 TEVANOXMOVIE - Updated Project Structure Analysis" "$PURPLE"
print_colored "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" "$CYAN"
echo ""

print_colored "📁 Project Root: $PROJECT_ROOT" "$YELLOW"
echo ""

# Create output file
echo "TEVANOXMOVIE - Updated Project Structure Analysis" > "$OUTPUT_FILE"
echo "========================================" >> "$OUTPUT_FILE"
echo "Generated on: $(date)" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# File Statistics
print_colored "📊 PROJECT OVERVIEW" "$CYAN"
echo "📊 PROJECT OVERVIEW" >> "$OUTPUT_FILE"
echo "----------------------------------------" >> "$OUTPUT_FILE"

total_files=$(find "$PROJECT_ROOT" -type f 2>/dev/null | wc -l)
echo "Total Files: $total_files" | tee -a "$OUTPUT_FILE"

py_files=$(find "$PROJECT_ROOT" -type f -name "*.py" 2>/dev/null | wc -l)
echo "  🐍 Python files: $py_files" | tee -a "$OUTPUT_FILE"

js_files=$(find "$PROJECT_ROOT" -type f \( -name "*.js" -o -name "*.jsx" \) 2>/dev/null | wc -l)
echo "  ⚛️ JavaScript/JSX files: $js_files" | tee -a "$OUTPUT_FILE"

ts_files=$(find "$PROJECT_ROOT" -type f \( -name "*.ts" -o -name "*.tsx" \) 2>/dev/null | wc -l)
echo "  📘 TypeScript/TSX files: $ts_files" | tee -a "$OUTPUT_FILE"

html_files=$(find "$PROJECT_ROOT" -type f -name "*.html" 2>/dev/null | wc -l)
echo "  🌐 HTML files: $html_files" | tee -a "$OUTPUT_FILE"

css_files=$(find "$PROJECT_ROOT" -type f -name "*.css" 2>/dev/null | wc -l)
echo "  🎨 CSS files: $css_files" | tee -a "$OUTPUT_FILE"

json_files=$(find "$PROJECT_ROOT" -type f -name "*.json" 2>/dev/null | wc -l)
echo "  📦 JSON files: $json_files" | tee -a "$OUTPUT_FILE"

md_files=$(find "$PROJECT_ROOT" -type f -name "*.md" 2>/dev/null | wc -l)
echo "  📝 Markdown files: $md_files" | tee -a "$OUTPUT_FILE"

echo "" >> "$OUTPUT_FILE"
echo ""

# =================================================================
# Check for SHARED TYPES in the correct location
# =================================================================
print_colored "📦 SHARED TYPES" "$PURPLE"
echo "📦 SHARED TYPES:" >> "$OUTPUT_FILE"
echo "----------------------------------------" >> "$OUTPUT_FILE"

SHARED_DIR="$PROJECT_ROOT/apps/tevanoxmovie-shared"
if [ -d "$SHARED_DIR" ]; then
    print_colored "✅ tevanoxmovie-shared found at: $SHARED_DIR" "$GREEN"
    echo "✅ tevanoxmovie-shared found at: $SHARED_DIR" >> "$OUTPUT_FILE"
    
    # List all TypeScript files
    find "$SHARED_DIR" -type f \( -name "*.ts" -o -name "*.tsx" \) 2>/dev/null | sort | while read -r file; do
        rel_path=${file#"$PROJECT_ROOT/"}
        lines=$(wc -l < "$file" 2>/dev/null || echo "0")
        echo "  📄 $rel_path ($lines lines)" | tee -a "$OUTPUT_FILE"
    done
else
    print_colored "❌ tevanoxmovie-shared not found at: $SHARED_DIR" "$RED"
    echo "❌ tevanoxmovie-shared not found at: $SHARED_DIR" >> "$OUTPUT_FILE"
fi
echo "" >> "$OUTPUT_FILE"

# =================================================================
# Check for BACKEND MODELS
# =================================================================
print_colored "🔧 BACKEND - MODELS" "$GREEN"
echo "🔧 BACKEND MODELS:" >> "$OUTPUT_FILE"
echo "----------------------------------------" >> "$OUTPUT_FILE"

MODELS_DIR="$PROJECT_ROOT/apps/tevanoxmovie-backend/app/models"
if [ -d "$MODELS_DIR" ]; then
    print_colored "✅ Models directory found at: $MODELS_DIR" "$GREEN"
    echo "✅ Models directory found at: $MODELS_DIR" >> "$OUTPUT_FILE"
    
    find "$MODELS_DIR" -type f -name "*.py" 2>/dev/null | sort | while read -r file; do
        rel_path=${file#"$PROJECT_ROOT/"}
        lines=$(wc -l < "$file" 2>/dev/null || echo "0")
        echo "  📄 $rel_path ($lines lines)" | tee -a "$OUTPUT_FILE"
    done
else
    print_colored "❌ Models directory not found at: $MODELS_DIR" "$RED"
    echo "❌ Models directory not found at: $MODELS_DIR" >> "$OUTPUT_FILE"
fi
echo "" >> "$OUTPUT_FILE"

# =================================================================
# Check for BACKEND SERVICES
# =================================================================
print_colored "🔧 BACKEND - SERVICES" "$BLUE"
echo "🔧 BACKEND SERVICES:" >> "$OUTPUT_FILE"
echo "----------------------------------------" >> "$OUTPUT_FILE"

SERVICES_DIR="$PROJECT_ROOT/apps/tevanoxmovie-backend/app/services"
if [ -d "$SERVICES_DIR" ]; then
    print_colored "✅ Services directory found at: $SERVICES_DIR" "$GREEN"
    echo "✅ Services directory found at: $SERVICES_DIR" >> "$OUTPUT_FILE"
    
    find "$SERVICES_DIR" -type f -name "*.py" 2>/dev/null | sort | while read -r file; do
        rel_path=${file#"$PROJECT_ROOT/"}
        lines=$(wc -l < "$file" 2>/dev/null || echo "0")
        echo "  📄 $rel_path ($lines lines)" | tee -a "$OUTPUT_FILE"
        # Show class definitions
        echo "  ──────────────────────────────────" >> "$OUTPUT_FILE"
        grep -E "^class |^def " "$file" 2>/dev/null | head -5 | sed 's/^/    /' >> "$OUTPUT_FILE"
        echo "" >> "$OUTPUT_FILE"
    done
else
    print_colored "❌ Services directory not found at: $SERVICES_DIR" "$RED"
    echo "❌ Services directory not found at: $SERVICES_DIR" >> "$OUTPUT_FILE"
fi
echo "" >> "$OUTPUT_FILE"

# =================================================================
# Check for BACKEND API ROUTES
# =================================================================
print_colored "🔧 BACKEND - API ROUTES" "$CYAN"
echo "🔧 BACKEND API ROUTES:" >> "$OUTPUT_FILE"
echo "----------------------------------------" >> "$OUTPUT_FILE"

API_DIR="$PROJECT_ROOT/apps/tevanoxmovie-backend/app/api/v1"
if [ -d "$API_DIR" ]; then
    print_colored "✅ API v1 directory found at: $API_DIR" "$GREEN"
    echo "✅ API v1 directory found at: $API_DIR" >> "$OUTPUT_FILE"
    
    find "$API_DIR" -type f -name "*.py" 2>/dev/null | sort | while read -r file; do
        rel_path=${file#"$PROJECT_ROOT/"}
        lines=$(wc -l < "$file" 2>/dev/null || echo "0")
        echo "  📄 $rel_path ($lines lines)" | tee -a "$OUTPUT_FILE"
        # Show route definitions
        echo "  ──────────────────────────────────" >> "$OUTPUT_FILE"
        grep -E "^@.*\.(get|post|put|delete|patch)" "$file" 2>/dev/null | sed 's/^/    /' >> "$OUTPUT_FILE"
        echo "" >> "$OUTPUT_FILE"
    done
else
    print_colored "❌ API v1 directory not found at: $API_DIR" "$RED"
    echo "❌ API v1 directory not found at: $API_DIR" >> "$OUTPUT_FILE"
fi
echo "" >> "$OUTPUT_FILE"

# =================================================================
# Check for SHAREHOLDER PORTAL
# =================================================================
print_colored "⚛️ FRONTEND - Shareholder Portal" "$YELLOW"
echo "⚛️ FRONTEND - SHAREHOLDER PORTAL:" >> "$OUTPUT_FILE"
echo "----------------------------------------" >> "$OUTPUT_FILE"

SHAREHOLDER_PORTAL="$PROJECT_ROOT/apps/tevanoxmovie-web/src/pages/ShareholderPortal.js"
if [ -f "$SHAREHOLDER_PORTAL" ]; then
    print_colored "✅ ShareholderPortal.js found!" "$GREEN"
    echo "✅ ShareholderPortal.js found!" >> "$OUTPUT_FILE"
    lines=$(wc -l < "$SHAREHOLDER_PORTAL" 2>/dev/null || echo "0")
    echo "  📄 ShareholderPortal.js ($lines lines)" | tee -a "$OUTPUT_FILE"
    
    echo "" >> "$OUTPUT_FILE"
    echo "📦 Imports:" >> "$OUTPUT_FILE"
    grep "^import " "$SHAREHOLDER_PORTAL" 2>/dev/null | head -10 | sed 's/^/  /' >> "$OUTPUT_FILE"
    
    echo "" >> "$OUTPUT_FILE"
    echo "🏗️ Component Structure:" >> "$OUTPUT_FILE"
    grep -E "^const |^function |^export " "$SHAREHOLDER_PORTAL" 2>/dev/null | head -10 | sed 's/^/  /' >> "$OUTPUT_FILE"
else
    print_colored "❌ ShareholderPortal.js not found at: $SHAREHOLDER_PORTAL" "$RED"
    echo "❌ ShareholderPortal.js not found at: $SHAREHOLDER_PORTAL" >> "$OUTPUT_FILE"
    
    # Try to find it
    find "$PROJECT_ROOT" -name "ShareholderPortal.js" 2>/dev/null | while read -r file; do
        echo "  Found at: $file" | tee -a "$OUTPUT_FILE"
    done
fi
echo "" >> "$OUTPUT_FILE"

# =================================================================
# Check for ADMIN PAGES
# =================================================================
print_colored "⚛️ FRONTEND - Admin Pages" "$PURPLE"
echo "⚛️ FRONTEND - ADMIN PAGES:" >> "$OUTPUT_FILE"
echo "----------------------------------------" >> "$OUTPUT_FILE"

ADMIN_DIR="$PROJECT_ROOT/apps/tevanoxmovie-admin/src/pages"
if [ -d "$ADMIN_DIR" ]; then
    print_colored "✅ Admin pages directory found at: $ADMIN_DIR" "$GREEN"
    echo "✅ Admin pages directory found at: $ADMIN_DIR" >> "$OUTPUT_FILE"
    
    find "$ADMIN_DIR" -type f \( -name "*.js" -o -name "*.jsx" \) 2>/dev/null | sort | while read -r file; do
        rel_path=${file#"$PROJECT_ROOT/"}
        lines=$(wc -l < "$file" 2>/dev/null || echo "0")
        echo "  📄 $rel_path ($lines lines)" | tee -a "$OUTPUT_FILE"
    done
else
    print_colored "❌ Admin pages directory not found at: $ADMIN_DIR" "$RED"
    echo "❌ Admin pages directory not found at: $ADMIN_DIR" >> "$OUTPUT_FILE"
fi
echo "" >> "$OUTPUT_FILE"

# =================================================================
# Check for HOOKS
# =================================================================
print_colored "⚛️ FRONTEND - Hooks" "$BLUE"
echo "⚛️ FRONTEND - HOOKS:" >> "$OUTPUT_FILE"
echo "----------------------------------------" >> "$OUTPUT_FILE"

HOOKS_DIR="$PROJECT_ROOT/apps/tevanoxmovie-web/src/hooks"
if [ -d "$HOOKS_DIR" ]; then
    print_colored "✅ Hooks directory found at: $HOOKS_DIR" "$GREEN"
    echo "✅ Hooks directory found at: $HOOKS_DIR" >> "$OUTPUT_FILE"
    
    find "$HOOKS_DIR" -type f -name "*.js" 2>/dev/null | sort | while read -r file; do
        rel_path=${file#"$PROJECT_ROOT/"}
        lines=$(wc -l < "$file" 2>/dev/null || echo "0")
        echo "  📄 $rel_path ($lines lines)" | tee -a "$OUTPUT_FILE"
    done
else
    print_colored "❌ Hooks directory not found at: $HOOKS_DIR" "$RED"
    echo "❌ Hooks directory not found at: $HOOKS_DIR" >> "$OUTPUT_FILE"
fi
echo "" >> "$OUTPUT_FILE"

# =================================================================
# Complete File Listing
# =================================================================
print_colored "📋 COMPLETE FILE LISTING" "$CYAN"
echo "📋 COMPLETE FILE LISTING" >> "$OUTPUT_FILE"
echo "----------------------------------------" >> "$OUTPUT_FILE"

echo "All shareholder-related files:" >> "$OUTPUT_FILE"
find "$PROJECT_ROOT/apps" -type f \( -name "*shareholder*" -o -name "*dividend*" -o -name "*profit*" \) 2>/dev/null | sort | while read -r file; do
    rel_path=${file#"$PROJECT_ROOT/"}
    size=$(du -h "$file" 2>/dev/null | cut -f1)
    echo "  📄 $rel_path ($size)" >> "$OUTPUT_FILE"
done

# =================================================================
# Generate HTML Report
# =================================================================
print_colored "🌐 Generating HTML report..." "$CYAN"

cat > "$HTML_OUTPUT" << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TEVANOXMOVIE - Shareholder System Report</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #0a0a1a;
            color: #e0e0e0;
            padding: 20px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: #12122a;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.5);
        }
        h1 { color: #FF4757; font-size: 2.5em; margin-bottom: 10px; }
        h2 { color: #4CAF50; margin: 30px 0 15px 0; border-bottom: 2px solid #333; padding-bottom: 10px; }
        .file-item {
            padding: 8px 12px;
            margin: 4px 0;
            background: #1a1a3e;
            border-radius: 6px;
            border-left: 3px solid #FF4757;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
        }
        .file-item .path { color: #4CAF50; }
        .file-item .size { color: #FF9800; float: right; }
        .badge { display: inline-block; padding: 2px 10px; border-radius: 12px; font-size: 0.8em; font-weight: bold; }
        .badge-found { background: #4CAF50; color: #fff; }
        .badge-missing { background: #FF4757; color: #fff; }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        .stat-card {
            background: #1a1a3e;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            border: 1px solid #2a2a5e;
        }
        .stat-card .number { font-size: 2em; font-weight: bold; color: #FF4757; }
        .stat-card .label { color: #aaa; margin-top: 5px; }
        .timestamp { color: #666; font-size: 0.9em; margin-top: 20px; text-align: center; }
EOF

# Add statistics
echo '<div class="stats-grid">' >> "$HTML_OUTPUT"
echo "<div class=\"stat-card\"><div class=\"number\">$total_files</div><div class=\"label\">Total Files</div></div>" >> "$HTML_OUTPUT"
echo "<div class=\"stat-card\"><div class=\"number\">$py_files</div><div class=\"label\">Python</div></div>" >> "$HTML_OUTPUT"
echo "<div class=\"stat-card\"><div class=\"number\">$js_files</div><div class=\"label\">JavaScript</div></div>" >> "$HTML_OUTPUT"
echo "<div class=\"stat-card\"><div class=\"number\">$ts_files</div><div class=\"label\">TypeScript</div></div>" >> "$HTML_OUTPUT"
echo '</div>' >> "$HTML_OUTPUT"

# File listing
echo '<h2>📁 Shareholder System Files</h2>' >> "$HTML_OUTPUT"
find "$PROJECT_ROOT/apps" -type f \( -name "*shareholder*" -o -name "*dividend*" -o -name "*profit*" -o -name "*Shareholder*" -o -name "*Dividend*" -o -name "*Profit*" \) 2>/dev/null | sort | while read -r file; do
    rel_path=${file#"$PROJECT_ROOT/"}
    size=$(du -h "$file" 2>/dev/null | cut -f1)
    echo "<div class=\"file-item\"><span class=\"path\">$rel_path</span><span class=\"size\">$size</span></div>" >> "$HTML_OUTPUT"
done

echo "<div class=\"timestamp\">Generated on: $(date '+%Y-%m-%d %H:%M:%S')</div>" >> "$HTML_OUTPUT"
echo '</div></body></html>' >> "$HTML_OUTPUT"

print_colored "✅ HTML report generated: $HTML_OUTPUT" "$GREEN"

# =================================================================
# SUMMARY
# =================================================================
print_colored "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" "$CYAN"
print_colored "✅ Analysis complete!" "$GREEN"
print_colored "📄 Text report: $OUTPUT_FILE" "$YELLOW"
print_colored "🌐 HTML report: $HTML_OUTPUT" "$YELLOW"
print_colored "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" "$CYAN"
echo ""

# Show what was found
print_colored "📊 Summary of Shareholder System Files:" "$CYAN"
echo ""
print_colored "📦 Shared Types:" "$PURPLE"
if [ -d "$SHARED_DIR" ]; then
    find "$SHARED_DIR" -type f -name "*.ts" 2>/dev/null | while read -r f; do
        echo "  ✅ $(basename "$f")"
    done
else
    echo "  ❌ Not found"
fi

echo ""
print_colored "🔧 Backend:" "$GREEN"
if [ -d "$MODELS_DIR" ]; then
    find "$MODELS_DIR" -type f -name "*.py" 2>/dev/null | while read -r f; do
        echo "  ✅ $(basename "$f")"
    done
else
    echo "  ❌ Models not found"
fi

if [ -d "$SERVICES_DIR" ]; then
    find "$SERVICES_DIR" -type f -name "*.py" 2>/dev/null | while read -r f; do
        echo "  ✅ $(basename "$f")"
    done
else
    echo "  ❌ Services not found"
fi

echo ""
print_colored "⚛️ Frontend:" "$CYAN"
if [ -f "$SHAREHOLDER_PORTAL" ]; then
    echo "  ✅ ShareholderPortal.js"
else
    echo "  ❌ ShareholderPortal.js not found"
fi

if [ -d "$ADMIN_DIR" ]; then
    find "$ADMIN_DIR" -type f \( -name "*.js" -o -name "*.jsx" \) 2>/dev/null | while read -r f; do
        echo "  ✅ $(basename "$f")"
    done
else
    echo "  ❌ Admin pages not found"
fi
echo ""