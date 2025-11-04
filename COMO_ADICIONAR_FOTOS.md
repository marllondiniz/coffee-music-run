# 📸 Como Adicionar Fotos na Landing Page

A página está configurada para receber duas fotos opcionais:

## 📍 Localização das Fotos

Adicione suas fotos na pasta `/public`:

```
coffe-music/
└── public/
    ├── hero-bg.jpg      (ou .png, .webp) - Foto de fundo do Hero
    └── announcement.jpg (ou .png, .webp) - Foto na seção de anúncio
```

## 🎨 Onde Cada Foto Aparece

### 1. `hero-bg.jpg` - Foto de Fundo no Hero
- Aparece como background com **blur intenso** (60px)
- **Escala de cinza** e opacidade reduzida
- Se a foto não existir, o site funciona normalmente com o gradiente

### 2. `announcement.jpg` - Foto na Seção de Anúncio
- Aparece como uma imagem destacada acima do texto
- **Escala de cinza** e brilho reduzido
- Borda sutil e gradiente suave
- Se a foto não existir, apenas o texto é exibido

## ✅ Formatos Suportados

- `.jpg` / `.jpeg`
- `.png`
- `.webp` (recomendado para melhor performance)

## 🔧 Customização

Se quiser mudar os nomes dos arquivos ou ajustar os efeitos, edite o arquivo `app/page.tsx`:

- **Hero Section**: Procure por `src="/hero-bg.jpg"`
- **Announcement Section**: Procure por `src="/announcement.jpg"`

## 💡 Dicas

- Use fotos com boa resolução (mínimo 1920px de largura para o hero)
- O Next.js otimiza automaticamente as imagens
- As fotos são convertidas para escala de cinza automaticamente
- Se não adicionar as fotos, o site funciona normalmente


