import { Button } from "primereact/button"
import React from "react"

const PendingCard = ({
  Status,
  Value,
  Icon,
  BackGroundColor = "#D0E1FD",
  ForeGroundColor = "#4482F6",
  mode,
  onViewMoreClick = () => null,
  viewMoreLabel = "View More",
}) => {
  return (
    <>
      <div className={`lead-card__container ${mode === "dark" ? "dark" : ""}`}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <p>{Status}</p>
          <div
            style={{
              background: BackGroundColor,
              padding: ".3em 0.5em",
              borderRadius: "4px",
            }}
          >
            <span style={{ color: ForeGroundColor }} className={Icon}></span>
          </div>
        </div>
        <div>
          <p style={{ fontWeight: "bold" }}>{Value}</p>
        </div>
        <div className="flex align-items-center justify-content-between">
          <p style={{ fontSize: "0.9rem" }}>
            <span style={{ color: "#22C55E" }}>{Value} new</span> since last
            week
          </p>
          <div>
            <Button
              label={viewMoreLabel}
              icon="pi pi-arrow-right"
              iconPos="right"
              type="button"
              className="rounded"
              onClick={onViewMoreClick}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default PendingCard
