import { useCallback } from "react";
import type { DestinationPack } from "../../types/destinationPack";
import { getAllPacks } from "../../config/destinationPacks";
import { trackDestinationPackSelected } from "../../lib/analytics";
import {
  IconGrid,
  IconHeart,
  IconSun,
  IconUtensils,
  IconLaptop,
  IconGem,
  IconMountain,
  IconUmbrella,
  IconUsers,
  IconBolt,
} from "../ui/Icons";
import type { ComponentType } from "react";
import "./pack-teaser.css";

/* ── Pack icon map ─────────────────────────────────────────── */

interface IconProps {
  readonly size?: number;
  readonly className?: string;
}

const PACK_ICON_MAP: Record<string, ComponentType<IconProps>> = {
  romantic_europe: IconHeart,
  italian_summer: IconSun,
  foodie_cities: IconUtensils,
  digital_nomad: IconLaptop,
  luxury_escape: IconGem,
  adventure: IconMountain,
  honeymoon: IconHeart,
  beach_escape: IconUmbrella,
  girls_trip: IconUsers,
  weekend_europe: IconBolt,
};

function PackIcon({ pack, size = 16 }: { readonly pack: DestinationPack; readonly size?: number }) {
  const Icon = PACK_ICON_MAP[pack.id] ?? IconGrid;
  return <Icon size={size} />;
}

/* ── Props ──────────────────────────────────────────────────── */

interface PackSheetProps {
  readonly onClose: () => void;
}

/* ── Component ──────────────────────────────────────────────── */

export function PackSheet({ onClose }: PackSheetProps) {
  const packs = getAllPacks();

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handlePackClick = useCallback((packId: string) => {
    trackDestinationPackSelected(packId);
    /* Future: activate pack mode in the roulette */
  }, []);

  return (
    <div className="pack-backdrop" onClick={handleBackdropClick}>
      <div
        className="pack-sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Destination Packs"
      >
        <div className="pack-handle">
          <div className="pack-handle-bar" />
        </div>

        <div className="pack-scroll">
          {/* Header */}
          <div className="pack-header">
            <div className="pack-badge">
              <IconGrid size={12} />
              Packs
            </div>
            <h2 className="pack-title">Destination Packs</h2>
            <p className="pack-subtitle">
              Curated themed roulettes. Pick a pack and spin for
              destinations that match the vibe.
            </p>
          </div>

          {/* Pack list */}
          <div className="pack-list">
            {packs.map((pack) => (
              <div
                key={pack.id}
                className={`pack-card${pack.isPremium ? " pack-card--premium" : ""}`}
                onClick={() => handlePackClick(pack.id)}
              >
                <span className="pack-card-icon">
                  <PackIcon pack={pack} size={16} />
                </span>
                <div className="pack-card-text">
                  <p className="pack-card-name">{pack.name}</p>
                  <p className="pack-card-desc">{pack.description}</p>
                </div>
                {pack.isPremium && (
                  <span className="pack-card-premium">Pro</span>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            className="pack-close-btn"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
