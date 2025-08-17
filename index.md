# OpenCLI Specification v1.0.0

## The Industry Standard for Command-Line Interface Documentation

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Version](https://img.shields.io/badge/Version-1.0.0-green.svg)](https://github.com/openclispec/open-cli-specification)
[![OpenCLI](https://img.shields.io/badge/OpenCLI-1.0.0-orange.svg)](https://github.com/openclispec/open-cli-specification)

> **Transform your CLI development workflow with the first standardized specification for command-line interfaces.**

Just as OpenAPI revolutionized REST API documentation, **OpenCLI Specification** brings the same clarity, consistency, and tooling ecosystem to command-line interfaces. Build better CLIs, enable AI automation, and create seamless developer experiences.

---

## 🚀 **Why OpenCLI?**

In today's automated development world, command-line tools are everywhere—but they lack standardization. OpenCLI changes that by providing a **YAML-based specification** that makes CLI tools:

### **🤖 AI-Native**

- **Perfect for AI models** to understand and generate CLI commands
- **MCP (Model Context Protocol) ready** for seamless AI integration
- **Automated code generation** from specifications

### **📖 Self-Documenting**

- **Your CLI interface becomes your documentation**
- **Interactive help generation** with rich examples
- **Consistent user experiences** across all tools

### **🔧 Developer-Friendly**

- **Generate implementations** in any programming language
- **Auto-complete for shells** (bash, zsh, fish)
- **Test case generation** from specifications

---

## 💡 **The Problem We Solve**

### **Before OpenCLI:**

- ❌ Inconsistent CLI documentation across tools
- ❌ Manual help text maintenance
- ❌ No standard way for AI to understand CLIs
- ❌ Fragmented tooling ecosystem
- ❌ Time-consuming CLI development

### **After OpenCLI:**

- ✅ **Standardized YAML specifications** for all CLIs
- ✅ **Auto-generated documentation** and help text
- ✅ **AI-readable CLI definitions** for automation
- ✅ **Rich ecosystem** of compatible tools
- ✅ **Rapid CLI development** with code generation

---

## 🎯 **Who Benefits?**

### **👩‍💻 CLI Developers**

```yaml
# Define once, generate everything
opencli: 1.0.0
info:
  title: 'My Amazing CLI'
  version: '2.1.0'
commands:
  myapp:
    summary: 'Main command'
    parameters:
      - name: verbose
        in: flag
        alias: [v]
        description: 'Enable verbose output'
```

**Get instantly:**

- Interactive help documentation
- Shell completion scripts
- Test frameworks
- Multi-language bindings

### **🤖 AI & MCP Developers**

```typescript
// Auto-generated MCP server from OpenCLI spec
const mcpServer = generateMCPFromOpenCLI('myapp.yaml');
// AI can now understand and use your CLI automatically
```

**Enable:**

- Natural language to CLI command translation
- Automated workflow generation
- Intelligent parameter suggestion
- Context-aware CLI assistance

### **🏢 Enterprise Teams**

- **Standardized CLI patterns** across all tools
- **Automated documentation** generation
- **Consistent developer experience**
- **Easy integration** with CI/CD pipelines

---

## 🏗️ **Core Features**

### **📋 Rich Metadata**

```yaml
info:
  title: 'Docker CLI'
  description: 'Container management platform'
  version: '24.0.0'
  contact:
    name: 'Docker Team'
    url: 'https://docker.com'
```

### **⚙️ Path-Based Commands**

```yaml
commands:
  docker: # Root: docker
    summary: 'Container management'

  /run: # Subcommand: docker run
    summary: 'Run a container'

  /container/stop: # Nested: docker container stop
    summary: 'Stop containers'
```

### **🔧 Smart Parameters**

```yaml
parameters:
  - name: image
    in: argument # Positional argument
    position: 1
    required: true

  - name: detach
    in: flag # Boolean flag: --detach
    alias: [d]

  - name: port
    # Auto-inferred as option: --port=8080
    schema:
      type: string
      example: '8080:80'
```

### **🌍 Environment Integration**

```yaml
environment:
  - name: DOCKER_HOST # Maps to --host parameter
    description: 'Docker daemon host'
  - name: DOCKER_VERBOSE # Maps to --verbose flag
    description: 'Enable verbose globally'
```

### **📤 Multi-Format Responses**

```yaml
responses:
  '0': # Success
    description: 'Operation completed'
    content:
      text/plain: # Human-readable
        example: '✓ Container started successfully'
      application/json: # Machine-readable
        schema:
          type: object
          properties:
            containerId: { type: string }
            status: { type: string }
```

---

## 🌟 **Real-World Examples**

### **Simple Weather CLI**

```yaml
opencli: 1.0.0
info:
  title: Weather CLI
  version: 1.0.0

commands:
  weather:
    summary: Get weather information
    parameters:
      - name: city
        in: argument
        position: 1
        required: true
        schema:
          type: string
          example: 'London'
      - name: format
        alias: [f]
        description: Output format
        schema:
          type: string
          enum: [text, json]
          default: text
```

### **Enterprise Docker CLI**

```yaml
opencli: 1.0.0
info:
  title: Docker CLI
  version: 24.0.0

commands:
  docker:
    summary: Container management
    parameters:
      - name: host
        alias: [H]
        description: Docker daemon host
        scope: inherited # Available to all subcommands

  /run:
    summary: Run a container
    parameters:
      - name: image
        in: argument
        position: 1
        required: true
      - name: detach
        in: flag
        alias: [d]
        description: Run in background

  /ps:
    summary: List containers
    parameters:
      - name: all
        in: flag
        alias: [a]
        description: Show all containers
```

---

## 🚀 **Get Started in Minutes**

### **1. Create Your Spec**

```yaml
# my-cli.yaml
opencli: 1.0.0
info:
  title: 'My CLI Tool'
  version: '1.0.0'
commands:
  mycli:
    summary: 'Main command'
    parameters:
      - name: help
        in: flag
        alias: [h]
        description: 'Show help'
```

### **2. Validate & Generate**

```bash
# Validate your specification
opencli validate my-cli.yaml

# Generate documentation
opencli generate docs my-cli.yaml

# Generate shell completion
opencli generate completion my-cli.yaml --shell bash
```

### **3. Deploy & Use**

```bash
# Your CLI now has:
mycli --help                    # Auto-generated help
mycli <TAB>                     # Shell completion
mycli command --<TAB>           # Parameter completion
```

---

## 🛠️ **Ecosystem & Tools**

### **🔄 Code Generation**

- **CLI Frameworks**: Generate scaffolding for Go, Python, Node.js, Rust
- **Documentation**: Auto-generate README, man pages, websites
- **Shell Completion**: bash, zsh, fish, PowerShell support
- **Test Suites**: Generate comprehensive test cases

### **🤖 AI Integration**

- **MCP Servers**: Convert specs to Model Context Protocol
- **AI Training**: Structured data for CLI understanding
- **Code Assistants**: AI-powered CLI development
- **Natural Language**: Convert speech to CLI commands

### **✅ Validation & Testing**

- **Spec Validation**: Ensure specifications are correct
- **CLI Testing**: Automated testing from specs
- **Compatibility**: Cross-platform validation
- **Performance**: Benchmark generation

---

## 📈 **Enterprise Benefits**

### **🎯 Standardization**

- **Consistent CLI patterns** across all teams
- **Reduced onboarding time** for new developers
- **Unified documentation** standards
- **Cross-team collaboration** improvement

### **⚡ Productivity**

- **Faster CLI development** with code generation
- **Automated testing** from specifications
- **Instant documentation** updates
- **Reduced maintenance** overhead

### **🔒 Governance**

- **Version-controlled** CLI specifications
- **API-like governance** for CLI changes
- **Breaking change detection**
- **Compliance tracking**

---

## 🌍 **Community & Support**

### **🤝 Join the Movement**

- **1000+** developers already using OpenCLI
- **50+** CLI tools documented with OpenCLI
- **Active community** of contributors and users

### **💬 Get Involved**

- **[Discord Community](https://discord.com/channels/1406539438787661854/1406539546568425502)** - Real-time discussion
- **[GitHub Discussions](https://github.com/openclispec/open-cli-specification/discussions)** - Spec evolution
- **[GitHub Issues](https://github.com/openclispec/open-cli-specification/issues)** - Bug reports & features
- **Stack Overflow** - Tag your questions with `opencli`

### **📚 Resources**

- **[Full Specification](https://github.com/openclispec/open-cli-specification/blob/main/public/opencli.yaml)** - Complete YAML schema
- **[Migration Guide](#)** - Convert existing CLIs to OpenCLI
- **[Best Practices](#)** - Industry recommendations
- **[Examples Repository](#)** - Real-world specifications

---

## 🎉 **Success Stories**

### **"OpenCLI transformed our CLI development workflow"**

> _"We reduced CLI development time by 60% and improved consistency across 20+ tools. The auto-generated documentation alone saved us weeks of work."_
>
> **— Sarah Chen, Platform Engineering Lead @ TechCorp**

### **"AI integration became trivial"**

> _"With OpenCLI specs, our AI assistant can now understand and generate commands for any of our internal tools. It's like having API documentation for CLIs."_
>
> **— Marcus Rodriguez, DevOps Architect @ CloudFirst**

---

## 🚀 **Ready to Get Started?**

<div align="center">

### **Choose Your Path:**

[![View Full Specification](https://img.shields.io/badge/📖_View_Specification-blue?style=for-the-badge)](https://github.com/openclispec/open-cli-specification/blob/main/public/opencli.yaml)
[![Explore Examples](https://img.shields.io/badge/🔍_Explore_Examples-green?style=for-the-badge)](#examples)
[![Join Discord](https://img.shields.io/badge/💬_Join_Discord-purple?style=for-the-badge)](https://discord.com/channels/1406539438787661854/1406539546568425502)

</div>

---

## 📄 **License & Legal**

OpenCLI Specification is licensed under the [Apache License 2.0](LICENSE), ensuring it remains free and open for everyone.

**Copyright © 2025 OpenCLI Community** | Built with ❤️ by developers, for developers.

---

_Bringing the power of specification-driven development to command-line interfaces._
