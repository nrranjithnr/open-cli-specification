# Production-level Makefile for OpenCLI Specification React App

# Variables
NODE_VERSION := 18
YARN := yarn
NPM := npm
BUILD_DIR := dist
SRC_DIR := src
PUBLIC_DIR := public
PORT := 3000
PREVIEW_PORT := 4173

# Colors for output
RED := \033[0;31m
GREEN := \033[0;32m
YELLOW := \033[1;33m
BLUE := \033[0;34m
NC := \033[0m # No Color

# Default target
.DEFAULT_GOAL := help

# Help target
.PHONY: help
help: ## Show this help message
	@echo "$(BLUE)OpenCLI Specification React App$(NC)"
	@echo "=================================="
	@echo ""
	@echo "Available commands:"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  $(GREEN)%-15s$(NC) %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# Environment setup
.PHONY: check-node
check-node: ## Check if Node.js is installed with correct version
	@echo "$(BLUE)Checking Node.js version...$(NC)"
	@node --version | grep -E "v(18|19|20|21|22)\." > /dev/null || (echo "$(RED)Node.js 18.x or higher is required$(NC)" && exit 1)
	@echo "$(GREEN)Node.js version is compatible$(NC)"

.PHONY: install
install: check-node ## Install dependencies
	@echo "$(BLUE)Installing dependencies...$(NC)"
	@if command -v yarn >/dev/null 2>&1; then \
		$(YARN) install --frozen-lockfile; \
	else \
		$(NPM) ci; \
	fi
	@echo "$(GREEN)Dependencies installed successfully$(NC)"

.PHONY: install-dev
install-dev: check-node ## Install development dependencies
	@echo "$(BLUE)Installing development dependencies...$(NC)"
	@if command -v yarn >/dev/null 2>&1; then \
		$(YARN) install; \
	else \
		$(NPM) install; \
	fi
	@echo "$(GREEN)Development dependencies installed$(NC)"

# Development
.PHONY: dev
dev: install ## Start development server
	@echo "$(BLUE)Starting development server on port $(PORT)...$(NC)"
	@if command -v yarn >/dev/null 2>&1; then \
		$(YARN) dev; \
	else \
		$(NPM) run dev; \
	fi

.PHONY: dev-host
dev-host: install ## Start development server accessible from network
	@echo "$(BLUE)Starting development server with network access...$(NC)"
	@if command -v yarn >/dev/null 2>&1; then \
		$(YARN) dev --host; \
	else \
		$(NPM) run dev -- --host; \
	fi

# Code quality
.PHONY: lint
lint: ## Run ESLint
	@echo "$(BLUE)Running ESLint...$(NC)"
	@if command -v yarn >/dev/null 2>&1; then \
		$(YARN) lint; \
	else \
		$(NPM) run lint; \
	fi
	@echo "$(GREEN)Linting completed$(NC)"

.PHONY: lint-fix
lint-fix: ## Fix ESLint issues automatically
	@echo "$(BLUE)Fixing ESLint issues...$(NC)"
	@if command -v yarn >/dev/null 2>&1; then \
		$(YARN) lint:fix; \
	else \
		$(NPM) run lint:fix; \
	fi
	@echo "$(GREEN)ESLint fixes applied$(NC)"

.PHONY: format
format: ## Format code with Prettier
	@echo "$(BLUE)Formatting code with Prettier...$(NC)"
	@if command -v yarn >/dev/null 2>&1; then \
		$(YARN) format; \
	else \
		$(NPM) run format; \
	fi
	@echo "$(GREEN)Code formatted$(NC)"

.PHONY: type-check
type-check: ## Run TypeScript type checking
	@echo "$(BLUE)Running TypeScript type check...$(NC)"
	@if command -v yarn >/dev/null 2>&1; then \
		$(YARN) type-check; \
	else \
		$(NPM) run type-check; \
	fi
	@echo "$(GREEN)Type checking completed$(NC)"

.PHONY: quality
quality: lint type-check ## Run all code quality checks
	@echo "$(GREEN)All quality checks passed$(NC)"

# Building
.PHONY: clean
clean: ## Clean build artifacts and cache
	@echo "$(BLUE)Cleaning build artifacts...$(NC)"
	@rm -rf $(BUILD_DIR)
	@rm -rf node_modules/.vite
	@rm -rf .eslintcache
	@if command -v yarn >/dev/null 2>&1; then \
		$(YARN) clean 2>/dev/null || true; \
	else \
		$(NPM) run clean 2>/dev/null || true; \
	fi
	@echo "$(GREEN)Build artifacts cleaned$(NC)"

.PHONY: build
build: clean install quality ## Build for production
	@echo "$(BLUE)Building for production...$(NC)"
	@if command -v yarn >/dev/null 2>&1; then \
		$(YARN) build; \
	else \
		$(NPM) run build; \
	fi
	@echo "$(GREEN)Production build completed$(NC)"
	@echo "$(YELLOW)Build size:$(NC)"
	@du -sh $(BUILD_DIR)

.PHONY: build-dev
build-dev: clean install ## Build without quality checks (faster)
	@echo "$(BLUE)Building for production (development mode)...$(NC)"
	@if command -v yarn >/dev/null 2>&1; then \
		$(YARN) build; \
	else \
		$(NPM) run build; \
	fi
	@echo "$(GREEN)Development build completed$(NC)"

# Testing and preview
.PHONY: preview
preview: build ## Preview production build locally
	@echo "$(BLUE)Starting preview server on port $(PREVIEW_PORT)...$(NC)"
	@if command -v yarn >/dev/null 2>&1; then \
		$(YARN) preview; \
	else \
		$(NPM) run preview; \
	fi

.PHONY: serve
serve: build ## Serve production build on custom port
	@echo "$(BLUE)Serving production build on port $(PORT)...$(NC)"
	@if command -v yarn >/dev/null 2>&1; then \
		$(YARN) serve; \
	else \
		$(NPM) run serve; \
	fi

# Deployment preparation
.PHONY: validate-spec
validate-spec: ## Validate YAML specification files
	@echo "$(BLUE)Validating YAML specification...$(NC)"
	@if [ -f "public/opencli.yaml" ]; then \
		echo "$(GREEN)Found opencli.yaml$(NC)"; \
		node -e "const yaml = require('js-yaml'); const fs = require('fs'); try { yaml.load(fs.readFileSync('public/opencli.yaml', 'utf8')); console.log('✓ YAML is valid'); } catch (e) { console.error('✗ YAML validation failed:', e.message); process.exit(1); }" 2>/dev/null || echo "$(YELLOW)Install dependencies first to validate YAML$(NC)"; \
	else \
		echo "$(RED)opencli.yaml not found in public directory$(NC)"; \
		exit 1; \
	fi

.PHONY: check-assets
check-assets: ## Check if all required assets exist
	@echo "$(BLUE)Checking required assets...$(NC)"
	@assets=("public/opencli.yaml" "public/terminal-icon.svg" "public/robots.txt" "public/sitemap.xml"); \
	missing=0; \
	for asset in "$${assets[@]}"; do \
		if [ -f "$$asset" ]; then \
			echo "$(GREEN)✓ $$asset$(NC)"; \
		else \
			echo "$(RED)✗ $$asset$(NC)"; \
			missing=1; \
		fi; \
	done; \
	if [ $$missing -eq 1 ]; then \
		echo "$(RED)Some required assets are missing$(NC)"; \
		exit 1; \
	else \
		echo "$(GREEN)All required assets found$(NC)"; \
	fi

.PHONY: optimize
optimize: build ## Optimize build for deployment
	@echo "$(BLUE)Optimizing build...$(NC)"
	@if command -v gzip >/dev/null 2>&1; then \
		find $(BUILD_DIR) -type f \( -name "*.js" -o -name "*.css" -o -name "*.html" -o -name "*.svg" \) -exec gzip -k {} \;; \
		echo "$(GREEN)Gzip compression applied$(NC)"; \
	fi
	@if command -v brotli >/dev/null 2>&1; then \
		find $(BUILD_DIR) -type f \( -name "*.js" -o -name "*.css" -o -name "*.html" -o -name "*.svg" \) -exec brotli -k {} \;; \
		echo "$(GREEN)Brotli compression applied$(NC)"; \
	fi

.PHONY: deploy-prep
deploy-prep: validate-spec check-assets optimize ## Prepare for deployment
	@echo "$(GREEN)Deployment preparation completed$(NC)"
	@echo "$(BLUE)Deploy the '$(BUILD_DIR)' directory to your hosting provider$(NC)"

# Docker support
.PHONY: docker-build
docker-build: ## Build Docker image
	@echo "$(BLUE)Building Docker image...$(NC)"
	@docker build -t opencli-specification .
	@echo "$(GREEN)Docker image built$(NC)"

.PHONY: docker-run
docker-run: docker-build ## Run Docker container
	@echo "$(BLUE)Running Docker container on port 8080...$(NC)"
	@docker run -p 8080:80 opencli-specification

# Maintenance
.PHONY: update-deps
update-deps: ## Update dependencies
	@echo "$(BLUE)Updating dependencies...$(NC)"
	@if command -v yarn >/dev/null 2>&1; then \
		$(YARN) upgrade; \
	else \
		$(NPM) update; \
	fi
	@echo "$(GREEN)Dependencies updated$(NC)"

.PHONY: security-audit
security-audit: ## Run security audit
	@echo "$(BLUE)Running security audit...$(NC)"
	@if command -v yarn >/dev/null 2>&1; then \
		$(YARN) audit; \
	else \
		$(NPM) audit; \
	fi

.PHONY: info
info: ## Show project information
	@echo "$(BLUE)Project Information$(NC)"
	@echo "==================="
	@echo "Name: OpenCLI Specification"
	@echo "Build directory: $(BUILD_DIR)"
	@echo "Development port: $(PORT)"
	@echo "Preview port: $(PREVIEW_PORT)"
	@echo "Node.js version required: $(NODE_VERSION).x"
	@node --version 2>/dev/null || echo "Node.js not found"
	@if command -v yarn >/dev/null 2>&1; then \
		echo "Package manager: Yarn $$(yarn --version)"; \
	else \
		echo "Package manager: npm $$(npm --version)"; \
	fi

# Shortcuts for common tasks
.PHONY: start
start: dev ## Alias for 'make dev'

.PHONY: prod
prod: deploy-prep ## Build and prepare for production deployment

.PHONY: all
all: install quality build ## Install, check quality, and build
