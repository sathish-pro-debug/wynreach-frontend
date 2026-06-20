import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const API = "https://wynreach-backend.onrender.com/api/templates";

const EMAIL_BLOCK_TYPES = [
  {
    type: "header",
    icon: "H",
    label: "Heading",
    defaultProps: {
      text: "Your Heading Here",
      align: "center",
      color: "#0f172a",
      fontSize: "22px",
    },
  },
  {
    type: "text",
    icon: "¶",
    label: "Paragraph",
    defaultProps: {
      text: "Write your content here.",
      align: "left",
      color: "#334155",
      fontSize: "14px",
    },
  },
  {
    type: "image",
    icon: "⬜",
    label: "Image",
    defaultProps: {
      url: "https://placehold.co/560x200/6366f1/ffffff?text=Your+Image",
      alt: "Image",
    },
  },
  {
    type: "button",
    icon: "▶",
    label: "Button",
    defaultProps: {
      label: "Click Here",
      url: "#",
      bgColor: "#4f46e5",
      textColor: "#ffffff",
    },
  },
  {
    type: "columns",
    icon: "⊞",
    label: "2 Columns",
    defaultProps: {
      left: "Left column content.",
      right: "Right column content.",
    },
  },
  {
    type: "divider",
    icon: "—",
    label: "Divider",
    defaultProps: { color: "#e2e8f0" },
  },
  {
    type: "footer",
    icon: "f",
    label: "Footer",
    defaultProps: {
      text: "© 2025 Company · Unsubscribe",
      color: "#94a3b8",
      fontSize: "12px",
    },
  },
];

const MERGE_TAGS = [
  "{{first_name}}",
  "{{last_name}}",
  "{{company}}",
  "{{email}}",
  "{{phone}}",
  "{{order_id}}",
  "{{amount}}",
  "{{date}}",
  "{{invoice_id}}",
  "{{product_name}}",
  "{{unsubscribe_url}}",
];

const CATEGORY_OPTIONS = ["Marketing", "Utility", "Authentication"];

// ✅ Pre-built template definitions
const PRESET_TEMPLATES = [
  {
    id: "blank",
    name: "Blank",
    description: "Start from scratch",
    emoji: "📄",
    bg: "#f8fafc",
    blocks: [],
  },
  {
    id: "welcome",
    name: "Welcome Email",
    description: "Greet new subscribers",
    emoji: "👋",
    bg: "#eff6ff",
    blocks: [
      {
        id: 1,
        type: "header",
        props: {
          text: "Welcome to {{company}}! 🎉",
          align: "center",
          color: "#1e40af",
          fontSize: "26px",
        },
      },
      {
        id: 2,
        type: "image",
        props: {
          url: "https://placehold.co/560x200/3b82f6/ffffff?text=Welcome",
          alt: "Welcome",
        },
      },
      {
        id: 3,
        type: "text",
        props: {
          text: "Hi {{first_name}},\n\nWe're thrilled to have you on board. Get started by exploring our features and let us know if you need any help.",
          align: "left",
          color: "#334155",
          fontSize: "14px",
        },
      },
      {
        id: 4,
        type: "button",
        props: {
          label: "Get Started →",
          url: "#",
          bgColor: "#3b82f6",
          textColor: "#ffffff",
        },
      },
      { id: 5, type: "divider", props: { color: "#e2e8f0" } },
      {
        id: 6,
        type: "footer",
        props: {
          text: "© 2025 {{company}} · Unsubscribe",
          color: "#94a3b8",
          fontSize: "12px",
        },
      },
    ],
  },
  {
    id: "promo",
    name: "Promotional Offer",
    description: "Announce deals & discounts",
    emoji: "🎁",
    bg: "#fdf4ff",
    blocks: [
      {
        id: 1,
        type: "header",
        props: {
          text: "🔥 Special Offer Just for You!",
          align: "center",
          color: "#7e22ce",
          fontSize: "26px",
        },
      },
      {
        id: 2,
        type: "image",
        props: {
          url: "https://placehold.co/560x200/a855f7/ffffff?text=SALE+50%25+OFF",
          alt: "Sale",
        },
      },
      {
        id: 3,
        type: "text",
        props: {
          text: "Hi {{first_name}},\n\nDon't miss out on our limited time offer. Use the code below to get 50% off your next purchase.",
          align: "center",
          color: "#334155",
          fontSize: "14px",
        },
      },
      {
        id: 4,
        type: "header",
        props: {
          text: "SAVE50",
          align: "center",
          color: "#7e22ce",
          fontSize: "32px",
        },
      },
      {
        id: 5,
        type: "button",
        props: {
          label: "Claim Your Discount",
          url: "#",
          bgColor: "#a855f7",
          textColor: "#ffffff",
        },
      },
      {
        id: 6,
        type: "text",
        props: {
          text: "Offer expires on {{date}}. Terms and conditions apply.",
          align: "center",
          color: "#94a3b8",
          fontSize: "12px",
        },
      },
      {
        id: 7,
        type: "footer",
        props: {
          text: "© 2025 {{company}} · Unsubscribe",
          color: "#94a3b8",
          fontSize: "12px",
        },
      },
    ],
  },
  {
    id: "newsletter",
    name: "Newsletter",
    description: "Share updates & news",
    emoji: "📰",
    bg: "#f0fdf4",
    blocks: [
      {
        id: 1,
        type: "header",
        props: {
          text: "{{company}} Monthly Newsletter",
          align: "center",
          color: "#15803d",
          fontSize: "24px",
        },
      },
      { id: 2, type: "divider", props: { color: "#bbf7d0" } },
      {
        id: 3,
        type: "header",
        props: {
          text: "What's New This Month",
          align: "left",
          color: "#166534",
          fontSize: "18px",
        },
      },
      {
        id: 4,
        type: "text",
        props: {
          text: "Hi {{first_name}},\n\nHere's a roundup of everything that happened this month. We've been busy building new features and improving your experience.",
          align: "left",
          color: "#334155",
          fontSize: "14px",
        },
      },
      {
        id: 5,
        type: "columns",
        props: {
          left: "📊 Feature Update\nWe launched new analytics dashboard this month.",
          right:
            "🚀 Coming Soon\nExciting features are on the way. Stay tuned!",
        },
      },
      {
        id: 6,
        type: "button",
        props: {
          label: "Read Full Update",
          url: "#",
          bgColor: "#16a34a",
          textColor: "#ffffff",
        },
      },
      { id: 7, type: "divider", props: { color: "#e2e8f0" } },
      {
        id: 8,
        type: "footer",
        props: {
          text: "© 2025 {{company}} · Unsubscribe",
          color: "#94a3b8",
          fontSize: "12px",
        },
      },
    ],
  },
  {
    id: "order",
    name: "Order Confirmation",
    description: "Confirm purchases",
    emoji: "🛒",
    bg: "#fff7ed",
    blocks: [
      {
        id: 1,
        type: "header",
        props: {
          text: "Order Confirmed! ✅",
          align: "center",
          color: "#c2410c",
          fontSize: "26px",
        },
      },
      {
        id: 2,
        type: "text",
        props: {
          text: "Hi {{first_name}},\n\nThank you for your order! We've received your purchase and it's being processed.",
          align: "center",
          color: "#334155",
          fontSize: "14px",
        },
      },
      {
        id: 3,
        type: "columns",
        props: {
          left: "Order ID\n#{{order_id}}",
          right: "Amount\n₹{{amount}}",
        },
      },
      { id: 4, type: "divider", props: { color: "#fed7aa" } },
      {
        id: 5,
        type: "text",
        props: {
          text: "Your order will be delivered by {{date}}. You'll receive a tracking link once it ships.",
          align: "left",
          color: "#334155",
          fontSize: "14px",
        },
      },
      {
        id: 6,
        type: "button",
        props: {
          label: "Track Your Order",
          url: "#",
          bgColor: "#ea580c",
          textColor: "#ffffff",
        },
      },
      {
        id: 7,
        type: "footer",
        props: {
          text: "© 2025 {{company}} · Need help? Reply to this email.",
          color: "#94a3b8",
          fontSize: "12px",
        },
      },
    ],
  },
];

const uploadImage = async (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const Field = ({
  label,
  field,
  type = "text",
  rows,
  localValues,
  onChange,
}) => (
  <div className="mb-3">
    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
      {label}
    </label>
    {rows ? (
      <textarea
        value={localValues[field] ?? ""}
        onChange={(e) => onChange(field, e.target.value)}
        rows={rows}
        className="w-full border border-slate-200 rounded-lg px-2.5 py-2 text-xs text-slate-700 resize-none focus:outline-none focus:border-indigo-400"
      />
    ) : type === "color" ? (
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={localValues[field] ?? "#000000"}
          onChange={(e) => onChange(field, e.target.value)}
          className="w-9 h-8 border border-slate-200 rounded-lg cursor-pointer"
        />
        <input
          type="text"
          value={localValues[field] ?? ""}
          onChange={(e) => onChange(field, e.target.value)}
          className="flex-1 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-mono"
        />
      </div>
    ) : (
      <input
        type={type}
        value={localValues[field] ?? ""}
        onChange={(e) => onChange(field, e.target.value)}
        className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-indigo-400"
      />
    )}
  </div>
);

const ImageField = ({
  localValues,
  onChange,
  onUpdate,
  index,
  setLocalValues,
}) => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Generate preview URL from S3 key or presigned URL
  const getPreviewUrl = () => {
    if (localValues.previewUrl) return localValues.previewUrl;
    if (localValues.url) return localValues.url;
    return null;
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file");
      return;
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setUploadError("Image size must be less than 10MB");
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("https://wynreach-backend.onrender.com/api/uploads/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Upload failed");
      }

      const data = await response.json();

      // Store the public image URL for email delivery, while retaining the storage key.
      setLocalValues((prev) => ({
        ...prev,
        url: data.url,
        storageKey: data.key,
        previewUrl: data.url,
      }));

      // Update block with the same URL the email renderer will send.
      onUpdate(index, {
        url: data.url,
        storageKey: data.key,
        previewUrl: data.url,
      });

      setPreviewUrl(data.url);
    } catch (err) {
      setUploadError(err.message || "Image upload failed");
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const preview = getPreviewUrl();

  return (
    <div className="mb-3">
      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
        Image
      </label>

      {/* Image Preview */}
      {preview && (
        <div className="mb-2 rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-auto max-h-48 object-cover"
            onError={() => setPreviewUrl(null)}
          />
        </div>
      )}

      {/* S3 Key Display */}
      {localValues.url && (
        <div className="mb-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-[10px] text-blue-700 font-mono break-all">
            {localValues.url}
          </p>
          <p className="text-[9px] text-blue-600 mt-1">💾 Stored in AWS S3</p>
        </div>
      )}

      {/* Upload Error */}
      {uploadError && (
        <div className="mb-2 p-2 bg-red-50 rounded-lg border border-red-200">
          <p className="text-[10px] text-red-700">{uploadError}</p>
        </div>
      )}

      {/* URL Input (alternative) */}
      <label className="block text-[10px] text-slate-500 mb-1">
        Direct URL (optional)
      </label>
      <input
        type="text"
        value={localValues.externalUrl ?? ""}
        onChange={(e) => onChange("externalUrl", e.target.value)}
        className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-indigo-400 mb-2"
        placeholder="https://example.com/image.jpg"
      />

      {/* Divider */}
      <div className="flex items-center gap-2 mb-2">
        <div className="flex-1 h-px bg-slate-200"></div>
        <span className="text-[10px] text-slate-400">OR</span>
        <div className="flex-1 h-px bg-slate-200"></div>
      </div>

      {/* Upload Button */}
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="w-full py-2 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold hover:bg-indigo-100 transition-colors border border-indigo-200 flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {uploading ? (
          <>
            <span className="animate-spin">⏳</span>
            Uploading...
          </>
        ) : (
          <>📁 Upload Image</>
        )}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Alt Text */}
      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 mt-3">
        Alt Text (for accessibility)
      </label>
      <input
        type="text"
        value={localValues.alt ?? ""}
        onChange={(e) => onChange("alt", e.target.value)}
        className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-indigo-400"
        placeholder="Image description"
      />
    </div>
  );
};

const BlockPropsPanel = ({ block, index, onUpdate }) => {
  const [localValues, setLocalValues] = useState({});
  const timeoutRef = useRef(null);
  useEffect(() => {
    if (block) setLocalValues(block.props || {});
  }, [block?.id]);
  if (!block)
    return (
      <p className="text-xs text-slate-400 text-center py-6">
        Click any block on the canvas to edit its properties here.
      </p>
    );
  if (Object.keys(localValues).length === 0) return null;
  const handleChange = (field, value) => {
    setLocalValues((prev) => ({ ...prev, [field]: value }));
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(
      () => onUpdate(index, { [field]: value }),
      100,
    );
  };
  const f = { localValues, onChange: handleChange };
  switch (block.type) {
    case "header":
      return (
        <>
          <Field label="Heading Text" field="text" {...f} />
          <Field label="Color" field="color" type="color" {...f} />
          <Field label="Font Size" field="fontSize" {...f} />
        </>
      );
    case "text":
      return (
        <>
          <Field label="Paragraph Text" field="text" rows={5} {...f} />
          <Field label="Color" field="color" type="color" {...f} />
        </>
      );
    case "image":
      return (
        <ImageField
          localValues={localValues}
          onChange={handleChange}
          onUpdate={onUpdate}
          index={index}
          setLocalValues={setLocalValues}
        />
      );
    case "button":
      return (
        <>
          <Field label="Button Label" field="label" {...f} />
          <Field label="Link URL" field="url" {...f} />
          <Field label="BG Color" field="bgColor" type="color" {...f} />
          <Field label="Text Color" field="textColor" type="color" {...f} />
        </>
      );
    case "columns":
      return (
        <>
          <Field label="Left Column" field="left" rows={4} {...f} />
          <Field label="Right Column" field="right" rows={4} {...f} />
        </>
      );
    case "divider":
      return <Field label="Divider Color" field="color" type="color" {...f} />;
    case "footer":
      return (
        <>
          <Field label="Footer Text" field="text" rows={3} {...f} />
          <Field label="Color" field="color" type="color" {...f} />
        </>
      );
    default:
      return <p className="text-xs text-slate-400">No properties.</p>;
  }
};

const EmailBlockContent = ({ block }) => {
  const p = block.props;
  switch (block.type) {
    case "header":
      return (
        <div
          style={{
            textAlign: p.align,
            color: p.color,
            fontSize: p.fontSize,
            fontWeight: "bold",
            padding: "8px 0",
            fontFamily: "Arial, sans-serif",
          }}
        >
          {p.text}
        </div>
      );
    case "text":
      return (
        <p
          style={{
            textAlign: p.align,
            color: p.color,
            fontSize: p.fontSize,
            lineHeight: 1.6,
            margin: "8px 0",
            fontFamily: "Arial, sans-serif",
            whiteSpace: "pre-wrap",
          }}
        >
          {p.text}
        </p>
      );
    case "image":
      return (
        <div style={{ position: "relative", width: "100%", margin: "8px 0" }}>
          <img
            src={p.previewUrl || p.url}
            alt={p.alt || "Image"}
            style={{ width: "100%", borderRadius: 6, display: "block" }}
            onError={(e) => {
              // If preview fails and we have S3 key, show placeholder
              if (p.url && p.url.startsWith("templates/images/")) {
                e.target.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='200'%3E%3Crect fill='%23e2e8f0' width='560' height='200'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='16' fill='%2394a3b8' text-anchor='middle' dy='.3em'%3ES3 Image (Loading...)%3C/text%3E%3C/svg%3E";
              }
            }}
          />
          {p.url && p.url.startsWith("templates/images/") && (
            <div
              style={{
                position: "absolute",
                top: 4,
                right: 4,
                background: "#10b981",
                color: "white",
                padding: "2px 6px",
                borderRadius: 4,
                fontSize: "9px",
                fontWeight: "bold",
              }}
            >
              S3
            </div>
          )}
        </div>
      );
    case "button":
      return (
        <div style={{ textAlign: "center", margin: "14px 0" }}>
          <span
            style={{
              display: "inline-block",
              background: p.bgColor,
              color: p.textColor,
              padding: "11px 28px",
              borderRadius: 7,
              fontWeight: "bold",
              fontSize: 14,
              fontFamily: "Arial, sans-serif",
            }}
          >
            {p.label}
          </span>
        </div>
      );
    case "columns":
      return (
        <div style={{ display: "flex", gap: 12, margin: "8px 0" }}>
          <div
            style={{
              flex: 1,
              padding: 12,
              background: "#f8fafc",
              borderRadius: 7,
              fontSize: 13,
              color: "#475569",
              whiteSpace: "pre-wrap",
            }}
          >
            {p.left}
          </div>
          <div
            style={{
              flex: 1,
              padding: 12,
              background: "#f8fafc",
              borderRadius: 7,
              fontSize: 13,
              color: "#475569",
              whiteSpace: "pre-wrap",
            }}
          >
            {p.right}
          </div>
        </div>
      );
    case "divider":
      return (
        <hr
          style={{
            border: "none",
            borderTop: `1px solid ${p.color}`,
            margin: "14px 0",
          }}
        />
      );
    case "footer":
      return (
        <div
          style={{
            textAlign: "center",
            color: p.color,
            fontSize: p.fontSize,
            padding: "10px 0",
            fontFamily: "Arial, sans-serif",
          }}
        >
          {p.text}
        </div>
      );
    default:
      return <div className="text-xs text-slate-400 p-2">Unknown block</div>;
  }
};

const BlockWrapper = ({
  block,
  index,
  isSelected,
  onSelect,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}) => {
  return (
    <div
      onClick={() => onSelect(index)}
      className={`relative group rounded-lg mb-2 border-2 transition-all cursor-pointer ${isSelected ? "border-indigo-500 ring-2 ring-indigo-200" : "border-transparent hover:border-indigo-200"}`}
    >
      <EmailBlockContent block={block} />
      <div
        className={`absolute top-1.5 right-1.5 flex items-center gap-1 transition-opacity ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
      >
        {!isFirst && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMoveUp(index);
            }}
            className="w-6 h-6 bg-white border border-slate-200 rounded-md text-xs hover:bg-slate-100 flex items-center justify-center shadow-sm"
          >
            ↑
          </button>
        )}
        {!isLast && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMoveDown(index);
            }}
            className="w-6 h-6 bg-white border border-slate-200 rounded-md text-xs hover:bg-slate-100 flex items-center justify-center shadow-sm"
          >
            ↓
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(index);
          }}
          className="w-6 h-6 bg-red-500 text-white rounded-md text-xs hover:bg-red-600 flex items-center justify-center shadow-sm"
        >
          ×
        </button>
      </div>
    </div>
  );
};

const EmailCanvas = ({
  blocks,
  selectedBlock,
  onSelect,
  onDelete,
  onMoveUp,
  onMoveDown,
}) => (
  <div className="bg-white rounded-xl overflow-hidden shadow border border-slate-200">
    <div className="bg-indigo-600 px-5 py-2.5 flex justify-between items-center">
      <span className="text-white text-xs">From: noreply@company.com</span>
      <span className="text-indigo-200 text-xs">To: {"{{email}}"}</span>
    </div>
    <div className="p-5">
      {blocks.length === 0 ? (
        <div className="text-center py-12 text-slate-400 text-sm">
          <div className="text-3xl mb-2">✉️</div>
          <p>Your email canvas is empty</p>
          <p className="text-xs mt-1">
            Add blocks from the left panel to start building
          </p>
        </div>
      ) : (
        blocks.map((block, i) => (
          <BlockWrapper
            key={block.id}
            block={block}
            index={i}
            isSelected={selectedBlock === i}
            onSelect={onSelect}
            onDelete={onDelete}
            onMoveUp={onMoveUp}
            onMoveDown={onMoveDown}
            isFirst={i === 0}
            isLast={i === blocks.length - 1}
          />
        ))
      )}
    </div>
  </div>
);

// ✅ Template Picker Modal (only used for initial blank selection when skipPicker is false)
const TemplatePicker = ({ onSelect, onClose }) => {
  const [hoveredId, setHoveredId] = useState(null);

  const MiniPreview = ({ template }) => (
    <div className="w-full h-full flex flex-col p-2 space-y-1.5 overflow-hidden">
      {template.blocks.slice(0, 4).map((block, i) => {
        const p = block.props || {};
        if (block.type === "header")
          return (
            <div
              key={i}
              className="h-2.5 rounded font-bold"
              style={{
                background: p.color || "#0f172a",
                width: i === 0 ? "80%" : "60%",
                opacity: 0.8,
              }}
            />
          );
        if (block.type === "image")
          return (
            <div
              key={i}
              className="h-10 rounded w-full bg-indigo-100 flex items-center justify-center"
            >
              <span className="text-[8px] text-indigo-400">IMAGE</span>
            </div>
          );
        if (block.type === "button")
          return (
            <div
              key={i}
              className="h-4 rounded w-24 mx-auto flex items-center justify-center"
              style={{ background: p.bgColor || "#4f46e5" }}
            >
              <span className="text-[7px] text-white font-bold">
                {p.label || "Button"}
              </span>
            </div>
          );
        if (block.type === "divider")
          return <div key={i} className="h-px w-full bg-slate-200" />;
        if (block.type === "columns")
          return (
            <div key={i} className="flex gap-1">
              <div className="flex-1 h-6 bg-slate-100 rounded" />
              <div className="flex-1 h-6 bg-slate-100 rounded" />
            </div>
          );
        if (block.type === "footer")
          return (
            <div
              key={i}
              className="h-1.5 bg-slate-100 rounded w-full mt-auto"
            />
          );
        return (
          <div key={i} className="space-y-0.5">
            <div className="h-1 bg-slate-200 rounded w-full" />
            <div className="h-1 bg-slate-200 rounded w-4/5" />
          </div>
        );
      })}
      {template.blocks.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <span className="text-3xl opacity-30">+</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl">
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Choose a Template
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Start with a pre-built layout or create from scratch
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100"
          >
            ×
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {PRESET_TEMPLATES.map((template) => (
              <button
                key={template.id}
                onClick={() => onSelect(template)}
                onMouseEnter={() => setHoveredId(template.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`group flex flex-col rounded-xl border-2 overflow-hidden transition-all text-left ${hoveredId === template.id ? "border-indigo-500 shadow-lg scale-[1.02]" : "border-slate-200 hover:border-indigo-300"}`}
              >
                <div
                  className="h-36 flex flex-col p-2 overflow-hidden"
                  style={{ background: template.bg }}
                >
                  {template.blocks.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center">
                        <span className="text-xl text-slate-300">+</span>
                      </div>
                    </div>
                  ) : (
                    <MiniPreview template={template} />
                  )}
                </div>
                <div className="px-3 py-2 bg-white border-t border-slate-100">
                  <p className="text-xs font-bold text-slate-800 truncate">
                    {template.emoji} {template.name}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">
                    {template.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ------------------------------ WHATSAPP EDITOR ------------------------------
const WhatsAppTwoColumnEditor = ({
  templateName,
  setTemplateName,
  category,
  setCategory,
  language,
  setLanguage,
  header,
  setHeader,
  body,
  setBody,
  templateType,
  setTemplateType,
  mediaUrl,
  setMediaUrl,
  actions,
  setActions,
  varSamples,
  setVarSamples,
}) => {
  const headerMax = 60;
  const bodyMax = 1024;
  const [actionType, setActionType] = useState("");
  const [buttonName, setButtonName] = useState("");
  const [buttonValue, setButtonValue] = useState("");
  const fileInputRef = useRef(null);
  const [uploadingMedia, setUploadingMedia] = useState(false);

  const addAction = () => {
    if (!actionType || !buttonName) {
      alert("Please select an action type and enter a button name.");
      return;
    }
    setActions((prev) => [
      ...prev,
      { type: actionType, name: buttonName, value: buttonValue },
    ]);
    setActionType("");
    setButtonName("");
    setButtonValue("");
  };
  const removeAction = (idx) =>
    setActions((prev) => prev.filter((_, i) => i !== idx));
  const insertVariable = (tag) => setBody(body + tag);

  // ✅ NEW: detect numbered variables like {{1}}, {{2}} in the body
  const getVarNumbers = (text) => {
    const matches = [...text.matchAll(/\{\{\s*(\d+)\s*\}\}/g)];
    return [...new Set(matches.map((m) => m[1]))]; // unique, preserves first-seen order
  };

  // ✅ NEW: insert the next numbered variable (e.g. {{1}}, then {{2}}, ...)
  const insertNextNumberedVariable = () => {
    const existing = getVarNumbers(body).map(Number);
    const next = existing.length > 0 ? Math.max(...existing) + 1 : 1;
    insertVariable(`{{${next}}}`);
  };

  const handleMediaUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingMedia(true);
    try {
      const formData = new FormData();

      formData.append("file", file);
      const res = await fetch("https://wynreach-backend.onrender.com/api/uploads/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setMediaUrl(data.url);
    } catch {
      alert("Media upload failed.");
    } finally {
      setUploadingMedia(false);
    }
  };
  const getActionIcon = (type) =>
    ({ call: "📞", url: "🔗", quick_reply: "💬", flow: "🌊", coupon: "🏷️" })[
      type
    ] || "";
  const draftAction =
    actionType && buttonName
      ? { type: actionType, name: buttonName, isDraft: true }
      : null;

  const PreviewBubble = ({
    header,
    body,
    mediaUrl,
    templateType,
    actions,
    draftAction,
    varSamples,
  }) => {
    const allActions = draftAction ? [...actions, draftAction] : actions;
    return (
      <div className="bg-white rounded-[0_10px_10px_10px] overflow-hidden shadow-md border border-slate-100">
        {header && (
          <div className="px-4 pt-3 pb-1 text-sm font-bold text-slate-800 border-b border-slate-100">
            {header}
          </div>
        )}
        {templateType !== "TEXT" && mediaUrl && (
          <div className="px-4 pt-2">
            {templateType === "IMAGE" && (
              <img
                src={mediaUrl}
                alt="Uploaded"
                className="w-full rounded-md max-h-48 object-cover"
              />
            )}
            {templateType === "VIDEO" && (
              <video
                src={mediaUrl}
                controls
                className="w-full rounded-md max-h-48"
              />
            )}
            {templateType === "FILE" && (
              <div className="bg-slate-100 p-2 rounded text-xs flex items-center gap-2">
                📄{" "}
                <a
                  href={mediaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 underline"
                >
                  Download File
                </a>
              </div>
            )}
          </div>
        )}
        <div className="px-4 py-3 text-sm text-slate-700 whitespace-pre-wrap">
          {body.split(/\{\{(.*?)\}\}/g).map((part, i) => {
            const isNumberedVar = /^\d+$/.test(part);
            if (!isNumberedVar) {
              // Not a {{number}} variable — could be plain text, or a non-numbered tag like {{first_name}}
              const isOtherTag =
                /^[a-zA-Z_][\w]*$/.test(part) &&
                body.includes(`{{${part}}}`) &&
                part.length > 0 &&
                i % 2 === 1;
              return isOtherTag ? (
                <span
                  key={i}
                  className="bg-indigo-50 text-indigo-700 px-1 rounded font-mono text-xs"
                >{`{{${part}}}`}</span>
              ) : (
                part
              );
            }
            const sample = varSamples?.[part];
            return sample ? (
              <span key={i}>{sample}</span>
            ) : (
              <span
                key={i}
                className="bg-indigo-50 text-indigo-700 px-1 rounded font-mono text-xs"
              >{`{{${part}}}`}</span>
            );
          })}
        </div>
        {allActions.length > 0 && (
          <div className="border-t border-slate-100 divide-y divide-slate-100">
            {allActions.map((act, idx) => (
              <div
                key={idx}
                className={`px-4 py-3 text-sm font-semibold text-center flex items-center justify-center gap-2 ${act.isDraft ? "text-slate-400 bg-slate-50" : "text-[#00a5f4]"}`}
              >
                <span>{getActionIcon(act.type)}</span>
                <span>{act.name}</span>
                {act.isDraft && (
                  <span className="text-[9px] bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded-full ml-1">
                    draft
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const varNumbers = getVarNumbers(body);

  return (
    <div className="flex h-full gap-6">
      <div className="flex-1 overflow-y-auto pr-2 space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Template Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
            >
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          {/* <div><label className="block text-xs font-bold text-slate-700 mb-1">Language</label><select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"><option value="en">English (en)</option><option value="es">Spanish (es)</option><option value="fr">French (fr)</option></select></div> */}
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Template Type
          </label>
          <div className="flex flex-wrap gap-2">
            {["TEXT", "IMAGE", "VIDEO", "FILE"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setTemplateType(type);
                  if (type === "TEXT") setMediaUrl("");
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${templateType === type ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300"}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        {templateType !== "TEXT" && (
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {templateType === "IMAGE"
                ? "Upload Image"
                : templateType === "VIDEO"
                  ? "Upload Video"
                  : templateType === "FILE"
                    ? "Upload File"
                    : "Carousel (coming soon)"}
            </label>
            {templateType !== "CAROUSEL" && (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Or enter URL"
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
                />
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-px bg-slate-200"></div>
                  <span className="text-[10px] text-slate-400">OR</span>
                  <div className="flex-1 h-px bg-slate-200"></div>
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingMedia}
                  className="w-full py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-200 transition-colors border border-slate-200 flex items-center justify-center gap-1"
                >
                  {uploadingMedia
                    ? "Uploading..."
                    : `📁 Upload ${templateType.toLowerCase()}`}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={
                    templateType === "IMAGE"
                      ? "image/*"
                      : templateType === "VIDEO"
                        ? "video/*"
                        : "*/*"
                  }
                  onChange={handleMediaUpload}
                  className="hidden"
                />
              </div>
            )}
          </div>
        )}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Header{" "}
            <span className="text-slate-400 text-[10px]">(Optional)</span>
          </label>
          <input
            type="text"
            maxLength={headerMax}
            value={header}
            onChange={(e) => setHeader(e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
          />
          <div className="text-right text-[10px] text-slate-400 mt-1">
            {header.length}/{headerMax}
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Body <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={6}
            maxLength={bodyMax}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
          />
          

          {/* ✅ NEW: Variable Samples — mirrors Meta's "Variable samples" UI */}
          {varNumbers.length > 0 && (
            <div className="border-t border-slate-200 pt-4 mt-4">
              <h3 className="text-sm font-bold text-slate-800 mb-1">
                Variable Samples
              </h3>
              <p className="text-[11px] text-slate-500 mb-3">
                Include sample values for each variable to preview your message
                and help Meta review it. Don't include real customer data.
              </p>
              <div className="space-y-2">
                {varNumbers.map((num) => (
                  <div key={num} className="flex items-center gap-2">
                    <span className="w-14 shrink-0 text-xs font-mono text-slate-500 bg-slate-100 rounded px-2 py-1.5 text-center">{`{{${num}}}`}</span>
                    <input
                      type="text"
                      value={varSamples[num] ?? ""}
                      onChange={(e) =>
                        setVarSamples((prev) => ({
                          ...prev,
                          [num]: e.target.value,
                        }))
                      }
                      placeholder={`Sample value for {{${num}}}`}
                      className="flex-1 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-indigo-400"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="border-t border-slate-200 pt-4">
          <h3 className="text-sm font-bold text-slate-800 mb-3">
            Interactive Actions (Optional)
          </h3>
          <div className="bg-slate-50 rounded-lg p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                  Action Type
                </label>
                <select
                  value={actionType}
                  onChange={(e) => setActionType(e.target.value)}
                  className="w-full border border-slate-200 rounded-md px-2 py-1.5 text-xs"
                >
                  <option value="">Select...</option>
                  <option value="call">📞 Phone</option>
                  <option value="url">🔗 URL</option>
                  <option value="quick_reply">💬 Quick Reply</option>
                  <option value="flow">🌊 Flow</option>
                  <option value="coupon">🏷️ Coupon</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                  Button Name
                </label>
                <input
                  type="text"
                  value={buttonName}
                  onChange={(e) => setButtonName(e.target.value)}
                  className="w-full border border-slate-200 rounded-md px-2 py-1.5 text-xs"
                  placeholder="Button label"
                />
              </div>
            </div>
            {(actionType === "call" ||
              actionType === "url" ||
              actionType === "quick_reply") && (
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                  {actionType === "call"
                    ? "Phone"
                    : actionType === "url"
                      ? "URL"
                      : "Reply Text"}
                </label>
                <input
                  type={actionType === "url" ? "url" : "text"}
                  value={buttonValue}
                  onChange={(e) => setButtonValue(e.target.value)}
                  className="w-full border border-slate-200 rounded-md px-2 py-1.5 text-xs"
                />
              </div>
            )}
            <button
              type="button"
              onClick={addAction}
              className="text-xs font-bold text-indigo-600 hover:underline"
            >
              + Add CTA
            </button>
            {actions.length > 0 && (
              <div className="mt-2 space-y-2">
                {actions.map((act, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center bg-white p-2 rounded border border-slate-200 text-xs"
                  >
                    <span>
                      <strong>{act.name}</strong> ({act.type})
                    </span>
                    <button
                      type="button"
                      onClick={() => removeAction(idx)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-[380px] shrink-0 border-l border-slate-200 pl-6 flex flex-col overflow-y-auto">
        <h3 className="text-sm font-bold text-slate-800 mb-3">
          Preview{" "}
          <span className="text-[10px] font-normal text-slate-400">
            (WhatsApp)
          </span>
        </h3>
        <div className="bg-[#e5ddd5] p-4 rounded-xl flex-1 flex items-start justify-center overflow-y-auto">
          <div className="w-full max-w-sm">
            <div className="bg-[#075e54] rounded-t-xl px-4 py-2 flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#25d366] flex items-center justify-center text-white text-xs font-bold">
                A
              </div>
              <div className="text-white text-xs font-semibold">
                Business Name
              </div>
            </div>
            <PreviewBubble
              header={header}
              body={body}
              mediaUrl={mediaUrl}
              templateType={templateType}
              actions={actions}
              draftAction={draftAction}
              varSamples={varSamples}
            />
            <div className="text-[10px] text-slate-500 text-right mt-1">
              ENG • IN • 12:22
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ------------------------------ MAIN EDITOR PAGE ------------------------------
export default function TemplateEditorPage({
  templateId,
  onBack,
  initialChannel = "email",
  skipPicker = false, // <-- new
  openGenerativeOnLoad = false, // <-- new   // <-- new prop to skip template picker
}) {
  const navigate = useNavigate();

  const [formName, setFormName] = useState("");
  const [formChannel, setFormChannel] = useState(initialChannel);
  const [formCat, setFormCat] = useState("Utility");
  const [language, setLanguage] = useState("en");
  const [blocks, setBlocks] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [viewMode, setViewMode] = useState("desktop");
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showGenModal, setShowGenModal] = useState(false);

  // ✅ Template picker — show only for new email templates (onboarding)
  const [showTemplatePicker, setShowTemplatePicker] = useState(
    !templateId && initialChannel === "email" && !skipPicker,
  );
  const [showGenerativeModal, setShowGenerativeModal] = useState(false);
  const [waHeader, setWaHeader] = useState("");
  const [waBody, setWaBody] = useState(
    "Make your messages personal using variables like {{first_name}} and get more replies!",
  );
  const [waTemplateType, setWaTemplateType] = useState("TEXT");
  const [waMediaUrl, setWaMediaUrl] = useState("");
  const [waActions, setWaActions] = useState([]);
  const [waVarSamples, setWaVarSamples] = useState({}); // ✅ NEW: { "1": "barath", "2": "wynsync" }

  const isEditorWA = formChannel === "whatsapp";

  useEffect(() => {
    if (templateId && !String(templateId).startsWith("tpl-")) {
      setLoading(true);
      fetch(`${API}/${templateId}`)
        .then((r) => r.json())
        .then((data) => {
          setFormName(data.name || "");
          setFormChannel(data.type || "email");
          setFormCat(data.category || "Marketing");
          if (data.type === "whatsapp" && data.content) {
            try {
              const wa = JSON.parse(data.content);
              setWaHeader(wa.header || "");
              setWaBody(wa.body || "");
              setWaTemplateType(wa.templateType || "TEXT");
              setWaMediaUrl(wa.mediaUrl || "");
              setWaActions(wa.actions || []);
              setWaVarSamples(wa.varSamples || {}); // ✅ NEW
            } catch {}
          } else {
            try {
              setBlocks(JSON.parse(data.content || "[]"));
            } catch {
              setBlocks([]);
            }
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [templateId]);

  const addBlock = (bt) => {
    const newBlock = {
      id: Date.now(),
      type: bt.type,
      props: { ...bt.defaultProps },
    };
    setBlocks((prev) => [...prev, newBlock]);
    setSelectedIdx(blocks.length);
  };
  const deleteBlock = useCallback((i) => {
    setBlocks((prev) => prev.filter((_, idx) => idx !== i));
    setSelectedIdx((prev) => (prev === i ? null : prev > i ? prev - 1 : prev));
  }, []);
  const updateBlockProp = useCallback((i, newProps) => {
    setBlocks((prev) => {
      const updated = [...prev];
      updated[i] = {
        ...updated[i],
        props: { ...updated[i].props, ...newProps },
      };
      return updated;
    });
  }, []);
  const moveBlock = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= blocks.length) return;
    setBlocks((prev) => {
      const arr = [...prev];
      [arr[i], arr[j]] = [arr[j], arr[i]];
      return arr;
    });
    setSelectedIdx(j);
  };
  const insertMergeTagForEmail = (tag) => {
    if (selectedIdx === null) {
      alert("Select a text block first.");
      return;
    }
    const b = blocks[selectedIdx];
    if (!["header", "text", "footer"].includes(b.type)) {
      alert("Select a text block first.");
      return;
    }
    updateBlockProp(selectedIdx, { text: (b.props.text || "") + tag });
  };

  const handlePreview = async () => {
    setShowPreview(true);

    if (isEditorWA) return;

    setPreviewLoading(true);
    setPreviewError(null);

    try {
      const response = await fetch(`${API}/preview`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ template_content: blocks }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.detail || "Preview failed");
      }

      setPreviewData(data);
    } catch (err) {
      setPreviewError(err.message || "Preview failed");
    } finally {
      setPreviewLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formName.trim()) {
      alert("Please enter a template name.");
      return;
    }
    if (isEditorWA && !waBody.trim()) {
      alert("Please add a body message.");
      return;
    }
    if (isEditorWA && !/^[a-z0-9_]+$/.test(formName.trim())) {
      alert("WA name: lowercase, numbers, underscore only");
      return;
    }
    if (!isEditorWA && blocks.length === 0) {
      alert("Please add at least one block.");
      return;
    }
    const metaCategory =
      {
        Marketing: "MARKETING",
        Utility: "UTILITY",
        Authentication: "AUTHENTICATION",
        Promotional: "MARKETING",
        Transactional: "UTILITY",
        Onboarding: "UTILITY",
        Announcement: "MARKETING",
        "Re-engagement": "MARKETING",
      }[formCat] || "UTILITY";
    setSaving(true);
    try {
      const content = isEditorWA
        ? JSON.stringify({
            header: waHeader,
            body: waBody,
            templateType: waTemplateType,
            mediaUrl: waMediaUrl,
            actions: waActions,
            varSamples: waVarSamples,
          })
        : JSON.stringify(blocks);
      const payload = {
        name: formName.trim().toLowerCase().replace(/ /g, "_"),
        type: formChannel,
        category: formCat,
        content: content,
        variables: [],
        status: isEditorWA ? "pending_review" : "active",
      };
      if (templateId && !String(templateId).startsWith("tpl-")) {
        await fetch(`${API}/${templateId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        console.log("SAVE PAYLOAD", payload);
        const res = await fetch(`${API}/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const body = await res.text();
        console.log("STATUS:", res.status);
        console.log("BODY:", body);

        if (!res.ok) {
          throw new Error(body);
        }
      }
      if (isEditorWA) {
        const metaRes = await fetch(
          "https://wynreach-backend.onrender.com/api/whatsapp/templates/submit",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: payload.name,
              body: waBody,
              language,
              category: metaCategory,
            }),
          },
        );
        const metaData = await metaRes.json();
        if (!metaRes.ok || !metaData.success) {
          alert(
            "DB saved ✅\nMeta failed ❌\n" + JSON.stringify(metaData.error),
          );
        } else {
          alert("✅ Saved & submitted to Meta!");
        }
      } else {
        alert("✅ Email template saved!");
      }
      onBack();
    } catch (err) {
      alert("Save failed: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="h-screen flex flex-col bg-slate-100 overflow-hidden">
      {/* ✅ Template Picker Modal (only for initial new email template when skipPicker is false) */}
      {showTemplatePicker && (
        <TemplatePicker
          onSelect={(template) => {
            const blocksWithIds = template.blocks.map((b, i) => ({
              ...b,
              id: Date.now() + i,
            }));
            setBlocks(blocksWithIds);
            setShowTemplatePicker(false);
          }}
          onClose={() => setShowTemplatePicker(false)}
        />
      )}

      <header className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-slate-200 shrink-0 gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={onBack}
            className="group flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-200 shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div>
            <h1 className="text-sm font-bold text-slate-900 truncate">
              {formName || "Untitled Template"}
            </h1>
            <p className="text-[10px] text-slate-400">
              {isEditorWA ? "💬 WhatsApp" : "✉️ Email"} Template
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex bg-slate-100 rounded-lg p-0.5">
            {["desktop", "mobile"].map((m) => (
              <button
                key={m}
                onClick={() => setViewMode(m)}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all ${viewMode === m ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}
              >
                {m === "desktop" ? "🖥" : "📱"}
              </button>
            ))}
          </div>
          <button
            onClick={handlePreview}
            className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 text-xs font-semibold hover:bg-slate-50"
          >
            Preview Email
          </button>

          {/* ✅ NEW: AI Generative Templates button – navigates to /ai-templates */}
          {!isEditorWA && (
            <button
              onClick={() => navigate("/ai-templates")}
              className="px-3 py-1.5 border border-indigo-200 rounded-lg text-indigo-600 text-xs font-semibold hover:bg-indigo-50 transition-colors"
            >
              🤖 AI Generative Templates
            </button>
          )}

          {/* ✅ Kept: Generative button that opens modal */}
          {!isEditorWA && (
            <button
              onClick={() => setShowGenModal(true)}
              className="px-3 py-1.5 border border-indigo-200 rounded-lg text-indigo-600 text-xs font-semibold hover:bg-indigo-50 transition-colors"
            >
              ✨ Generative
            </button>
          )}

          <button
            onClick={onBack}
            className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 text-xs font-semibold hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 disabled:opacity-60 shadow-sm"
          >
            {saving && (
              <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            )}
            💾 Save
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-hidden p-6">
        {isEditorWA ? (
          <WhatsAppTwoColumnEditor
            templateName={formName}
            setTemplateName={setFormName}
            category={formCat}
            setCategory={setFormCat}
            language={language}
            setLanguage={setLanguage}
            header={waHeader}
            setHeader={setWaHeader}
            body={waBody}
            setBody={setWaBody}
            templateType={waTemplateType}
            setTemplateType={setWaTemplateType}
            mediaUrl={waMediaUrl}
            setMediaUrl={setWaMediaUrl}
            actions={waActions}
            setActions={setWaActions}
            varSamples={waVarSamples}
            setVarSamples={setWaVarSamples}
          />
        ) : (
          <div className="flex h-full gap-4">
            <aside className="w-44 bg-white rounded-xl border border-slate-200 flex flex-col shrink-0 overflow-hidden">
              <div className="p-3 flex-1 overflow-y-auto">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Blocks
                </p>
                <div className="flex flex-col gap-1 mb-5">
                  {EMAIL_BLOCK_TYPES.map((bt) => (
                    <button
                      key={bt.type}
                      onClick={() => addBlock(bt)}
                      className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 bg-white hover:border-indigo-300 hover:text-indigo-700 hover:bg-indigo-50 transition-all text-left"
                    >
                      <span className="text-sm font-bold text-indigo-400 w-4 text-center">
                        {bt.icon}
                      </span>
                      {bt.label}
                    </button>
                  ))}
                </div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Merge Tags
                </p>
                <div className="flex flex-col gap-1">
                  {MERGE_TAGS.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => insertMergeTagForEmail(tag)}
                      className="px-2 py-1.5 border border-slate-200 rounded-md text-[10px] font-mono text-cyan-700 bg-white hover:border-indigo-300 hover:bg-indigo-50 text-left transition-all truncate"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </aside>
            <main className="flex-1 bg-slate-100 overflow-y-auto flex flex-col items-center">
              <div
                style={{
                  width: "100%",
                  maxWidth: viewMode === "mobile" ? 420 : 600,
                }}
                className="transition-all duration-300"
              >
                <EmailCanvas
                  blocks={blocks}
                  selectedBlock={selectedIdx}
                  onSelect={setSelectedIdx}
                  onDelete={deleteBlock}
                  onMoveUp={(i) => moveBlock(i, -1)}
                  onMoveDown={(i) => moveBlock(i, 1)}
                />
              </div>
              {blocks.length > 0 && (
                <p className="text-[11px] text-slate-400 mt-4">
                  Click a block to select → Edit in right panel
                </p>
              )}
            </main>
            <aside className="w-60 bg-white rounded-xl border border-slate-200 flex flex-col shrink-0 overflow-hidden">
              <div className="p-4 flex-1 overflow-y-auto">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Template Settings
                </p>

                {/* Template Name */}
                <div className="mb-3">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Template Name *
                  </label>

                  <input
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-indigo-400"
                  />
                </div>

                {/* Category */}
                <div className="mb-3">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Category
                  </label>

                  <select
                    value={formCat}
                    onChange={(e) => setFormCat(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-indigo-400"
                  >
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Total Blocks */}
                <div className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded-lg mb-4 border border-slate-100">
                  <span className="text-[11px] text-slate-500 font-medium">
                    Total Blocks
                  </span>

                  <span className="text-xs font-bold text-slate-800 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                    {blocks.length}
                  </span>
                </div>

                <div className="border-t border-slate-100 my-3" />

                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Block Properties
                </p>

                <BlockPropsPanel
                  block={selectedIdx !== null ? blocks[selectedIdx] : null}
                  index={selectedIdx}
                  onUpdate={updateBlockProp}
                />

                {selectedIdx !== null && (
                  <button
                    onClick={() => deleteBlock(selectedIdx)}
                    className="mt-3 w-full py-2 bg-red-50 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-100 transition-colors border border-red-100"
                  >
                    🗑 Delete Block
                  </button>
                )}
              </div>
            </aside>
          </div>
        )}
      </div>

      {/* Generative Templates Modal (kept intact) */}
      {showGenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl">
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200">
              <span className="font-semibold text-slate-800 text-lg">
                ✨ Generative Templates
              </span>
              <button
                onClick={() => setShowGenModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xl"
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  {
                    id: "botanical",
                    name: "Botanical Newsletter",
                    thumb: "🌿",
                    bg: "#f5f0e8",
                    accent: "#2d5a27",
                  },
                  {
                    id: "darkpromo",
                    name: "Dark Promo",
                    thumb: "⚡",
                    bg: "#0f0f1a",
                    accent: "#f5a623",
                  },
                  {
                    id: "minimal",
                    name: "Minimal Clean",
                    thumb: "📄",
                    bg: "#ffffff",
                    accent: "#e63946",
                  },
                  {
                    id: "event",
                    name: "Event Invite",
                    thumb: "🎤",
                    bg: "#1e1b4b",
                    accent: "#a78bfa",
                  },
                  {
                    id: "pets",
                    name: "Pets Rescue",
                    thumb: "🐾",
                    bg: "#fef9f0",
                    accent: "#e67e22",
                  },
                  {
                    id: "halloween",
                    name: "Halloween Sale",
                    thumb: "🎃",
                    bg: "#000000",
                    accent: "#ff6600",
                  },
                ].map((template) => (
                  <button
                    key={template.id}
                    onClick={() => {
                      window.open(
                        `/email-builder?template=${template.id}`,
                        "_blank",
                      );
                      setShowGenModal(false);
                    }}
                    className="group rounded-xl border-2 border-slate-200 overflow-hidden hover:shadow-xl transition-all hover:border-indigo-400 text-left"
                  >
                    <div
                      className="h-32 flex items-center justify-center text-5xl"
                      style={{ backgroundColor: template.bg }}
                    >
                      {template.thumb}
                    </div>
                    <div className="p-3 bg-white">
                      <p className="font-bold text-slate-800 text-sm">
                        {template.name}
                      </p>
                      <div
                        className="mt-2 h-1 w-12 rounded-full"
                        style={{ backgroundColor: template.accent }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal (kept intact) */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl">
            <div className="flex justify-between items-center px-5 py-4 border-b border-slate-200">
              <span className="font-semibold text-slate-800">
                Preview — {formName || "Untitled"}
              </span>
              <button
                onClick={() => setShowPreview(false)}
                className="text-slate-400 hover:text-slate-600 text-xl"
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
              {isEditorWA ? (
                <div className="bg-[#e5ddd5] p-4 rounded-xl flex items-start justify-center overflow-y-auto">
                  <div className="max-w-sm w-full">
                    <div className="bg-[#075e54] rounded-t-xl px-4 py-2 flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#25d366] flex items-center justify-center text-white text-xs font-bold">
                        A
                      </div>
                      <div className="text-white text-xs font-semibold">
                        Business Name
                      </div>
                    </div>
                    <div className="bg-white rounded-[0_10px_10px_10px] overflow-hidden shadow">
                      {waHeader && (
                        <div className="px-4 pt-3 pb-1 text-sm font-bold text-slate-800 border-b border-slate-100">
                          {waHeader}
                        </div>
                      )}
                      <div className="px-4 py-3 text-sm text-slate-700 whitespace-pre-wrap">
                        {waBody.split(/\{\{(.*?)\}\}/g).map((part, i) => {
                          const isNumberedVar = /^\d+$/.test(part);
                          if (!isNumberedVar) return part;
                          const sample = waVarSamples?.[part];
                          return sample ? (
                            <span key={i}>{sample}</span>
                          ) : (
                            <span
                              key={i}
                              className="bg-indigo-50 text-indigo-700 px-1 rounded font-mono text-xs"
                            >{`{{${part}}}`}</span>
                          );
                        })}
                      </div>
                      {waActions.length > 0 && (
                        <div className="border-t border-slate-100 divide-y divide-slate-100">
                          {waActions.map((act, idx) => (
                            <div
                              key={idx}
                              className="px-4 py-3 text-sm font-semibold text-[#00a5f4] text-center"
                            >
                              {act.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : previewLoading ? (
                <div className="flex items-center justify-center min-h-[420px] text-sm text-slate-500">
                  Rendering final email...
                </div>
              ) : previewError ? (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {previewError}
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-4">
                  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                    <iframe
                      title="Email preview"
                      srcDoc={previewData?.html || ""}
                      className="w-full h-[640px] bg-white"
                    />
                  </div>
                  <aside className="bg-white border border-slate-200 rounded-xl p-4 text-xs text-slate-600 h-fit">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Preview Diagnostics
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between gap-3">
                        <span>Template Blocks Count</span>
                        <strong>{previewData?.template_blocks_count ?? 0}</strong>
                      </div>
                      <div className="flex justify-between gap-3">
                        <span>Image Count</span>
                        <strong>{previewData?.image_count ?? 0}</strong>
                      </div>
                      <div className="flex justify-between gap-3">
                        <span>Button Count</span>
                        <strong>{previewData?.button_count ?? 0}</strong>
                      </div>
                      <div className="flex justify-between gap-3">
                        <span>Open Tracking Present</span>
                        <strong>{previewData?.open_tracking_present ? "YES" : "NO"}</strong>
                      </div>
                      <div className="flex justify-between gap-3">
                        <span>Click Tracking Present</span>
                        <strong>{previewData?.click_tracking_present ? "YES" : "NO"}</strong>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="font-bold text-slate-700 mb-2">Image URLs Found</p>
                      {(previewData?.image_urls || []).length ? (
                        <ul className="space-y-1">
                          {previewData.image_urls.map((url, idx) => (
                            <li key={`${url}-${idx}`} className="break-all text-slate-500">
                              {url}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-slate-400">None</p>
                      )}
                    </div>
                    <div className="mt-4">
                      <p className="font-bold text-slate-700 mb-2">Button URLs Found</p>
                      {(previewData?.button_urls || []).length ? (
                        <ul className="space-y-1">
                          {previewData.button_urls.map((url, idx) => (
                            <li key={`${url}-${idx}`} className="break-all text-slate-500">
                              {url}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-slate-400">None</p>
                      )}
                    </div>
                  </aside>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
