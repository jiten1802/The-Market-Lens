# Market Lens

A comprehensive marketing analytics and budget allocation toolkit for data-driven marketing decisions.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Directory Structure](#directory-structure)
3. [Key Features](#key-features)
4. [Installation](#installation)
5. [Dependencies](#dependencies)
6. [Technologies Used](#technologies-used)
7. [Usage](#usage)
8. [Environment Variables](#environment-variables)
9. [Contributing](#contributing)

## Project Overview

Market Lens is a comprehensive suite of tools for analyzing marketing data, generating insights, optimizing budget allocation, and producing automated reports. It leverages data science, machine learning, and AI-powered analysis to help marketing teams make data-driven decisions.

The project addresses various marketing challenges:
- Analyzing marketing channel effectiveness 
- Optimizing budget allocation across channels
- Processing and visualizing e-commerce data
- Generating comprehensive, insightful marketing reports using AI

## Directory Structure

- **Analysis/** - Marketing channel analysis using machine learning models to understand which channels most effectively drive sales for different product lines
- **Budget Allocation/** - Budget optimization tools using time series modeling, bi-level optimization, and Robyn implementation for Media Mix Modeling (MMM)
- **Channel Allocation/** - Tools for analyzing and optimizing marketing channel allocation
- **Pipeline/** - Comprehensive analytics framework for processing and visualizing e-commerce data
- **Report/** - AI-powered marketing analytics and reporting system
- **Sales Allocation/** - Sales performance analysis and optimization

## Key Features

### Pipeline - Data Analytics Framework

The Pipeline module provides tools for:
- **Customer Analysis**: Univariate and bivariate analysis of customer behavior
- **Product Analysis**: Category performance, hierarchy visualization, and pricing analysis
- **Master Data Analysis**: Revenue trends, seasonal patterns, and channel performance
- **Feature Engineering**: Time-based features, customer value metrics, and price elasticity
- **Weather Impact Analysis**: Temperature correlations and precipitation effects on sales

### Budget Allocation Optimization

The Budget Allocation module implements three complementary approaches:
- **Time Series Approach**: Incorporates temporal effects and adapts allocations month by month
- **Bi-level Optimization**: Finds consistent allocation strategies while respecting constraints
- **Robyn Framework**: Implements Meta's open-source marketing mix modeling for attribution

### Marketing Channel Analysis

The Analysis module leverages machine learning to:
- **Channel Effectiveness**: Identify which marketing channels most effectively drive sales
- **Product Category Impact**: Analyze relationships between marketing channels and product sales/GMV
- **Model Interpretability**: Use LIME and SHAP for explaining model predictions
- **Statistical Analysis**: Perform hypothesis testing on marketing investment effectiveness

### AI-Driven Reporting System

The Report module uses a coordinated multi-agent AI approach:
- **Specialized Agents**: Exploration, SQL, ROI, Budget, KPI, and Market Analysis agents
- **Automated Analysis**: Process marketing data and extract meaningful insights
- **Formatted Reports**: Generate comprehensive reports in multiple formats (Markdown, PDF)
- **Data-Driven Recommendations**: Provide actionable intelligence through AI-powered analysis

## Installation

### Using Poetry (recommended):

```bash
poetry install
```

### Using pip:

```bash
pip install -r requirements.txt
```

## Dependencies

The project uses a wide range of libraries including:

### Data Analysis & Processing
- **Python 3.8+**: Core programming language
- **Pandas**: Data manipulation and analysis
- **NumPy**: Numerical computing
- **SciPy**: Scientific computing and advanced statistics

### Visualization
- **Matplotlib**: Creating static, interactive, and animated visualizations
- **Seaborn**: Statistical data visualization
- **Plotly**: Interactive, browser-based graphing library

### Machine Learning & AI
- **Scikit-learn**: Machine learning algorithms
- **RobynPy**: Media Mix Modeling implementation
- **LangChain**: LLM application framework
- **Groq**: High-performance LLM inference
- **LangGraph**: Agent orchestration
- **LIME & SHAP**: Model interpretability tools

### Web & API
- **FastAPI**: Modern, high-performance web framework
- **Uvicorn**: ASGI server implementation
- **Jinja2**: Template engine for web interfaces

### Reporting & Documentation
- **ReportLab**: PDF generation library
- **WeasyPrint**: HTML to PDF converter
- **Markdown**: Report formatting

### Development & Database
- **Poetry**: Dependency management
- **Git**: Version control
- **SQLite**: Lightweight database
- **SQLAlchemy**: SQL toolkit and ORM

## Technologies Used

Each module leverages specific technologies optimized for its purpose:

### Pipeline
- FastAPI for web interface
- Pandas, NumPy, and SciPy for data processing
- Plotly and Seaborn for interactive visualizations
- Kaleido for static image export

### Budget Allocation
- Mathematical optimization with scipy.optimize
- Custom bilevel optimization implementation
- Meta Robyn for Marketing Mix Modeling
- Time series modeling for temporal effects

### Analysis
- Machine learning with scikit-learn
- Model interpretability with LIME and SHAP
- Interactive visualizations with plotly
- Statistical testing with scipy.stats

### Report
- AI agents orchestrated through LangGraph
- LLM integration via Groq and LangChain
- PDF generation with ReportLab and WeasyPrint
- Data management with SQLAlchemy

## Usage

Each directory contains specialized tools for different aspects of marketing analytics:

### Pipeline

Run data analysis scripts:

```bash
python Pipeline/main.py
```

### Budget Allocation

Execute budget optimization scripts:

```bash
python Budget_Allocation/Budget_Allocation_Time_Series.py
```

Or use Jupyter notebooks for interactive optimization:

```bash
jupyter notebook Budget_Allocation/Budget_Allocation.ipynb
```

### Report Generation

Generate marketing reports using AI:

```bash
python Report/main.py
```

### Analysis

Run marketing channel analysis:

```bash
python Analysis/channel_analysis.py
```

## Environment Variables

Create a `.env` file in the Report directory with:

```
GROQ_API_KEY=your_api_key_here
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request 