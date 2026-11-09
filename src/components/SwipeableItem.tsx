import { useState, useRef } from 'react';

type SwipeableItemProps = {
      children: React.ReactNode;
      onDelete: () => void;
      onEdit: () => void;
};

export const SwipeableItem = ({ children, onDelete, onEdit }: SwipeableItemProps) => {
      const [offset, setOffset] = useState(0);
      const isDraggingRef = useRef(false);
      const startXRef = useRef(0);

      const handlePointerDown = (e: React.PointerEvent) => {
            isDraggingRef.current = true;
            startXRef.current = e.clientX;
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
      };

      const handlePointerMove = (e: React.PointerEvent) => {
            if (!isDraggingRef.current) return;

            const currentX = e.clientX;
            const diff = currentX - startXRef.current;

            // Limitamos el rango de arrastre
            if (diff > -180 && diff < 180) {
                  setOffset(diff);
            }
      };

      const handlePointerUp = () => {
            if (!isDraggingRef.current) return;
            isDraggingRef.current = false;

            if (offset < -100) {
                  onDelete();
            } else if (offset > 100) {
                  onEdit();
            }

            setOffset(0);
      };

      const isRight = offset > 0;
      const isLeft = offset < 0;

      return (
            <div style={{ position: 'relative', overflow: 'hidden', marginBottom: '8px', borderRadius: '8px', userSelect: 'none' }}>

                  {/* FONDO VERDE (EDICIÓN) - Ocupa el 100% por debajo */}
                  <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: '#22c55e',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        paddingLeft: '24px',
                        fontWeight: 'bold',
                        opacity: isRight ? 1 : 0, // Solo se ve si arrastras hacia la derecha
                        transition: 'opacity 0.2s ease'
                  }}>
                        Editar
                  </div>

                  {/* FONDO ROJO (ELIMINAR) - Ocupa el 100% por debajo */}
                  <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: '#ef4444',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingRight: '24px',
                        fontWeight: 'bold',
                        opacity: isLeft ? 1 : 0, // Solo se ve si arrastras hacia la izquierda
                        transition: 'opacity 0.2s ease'
                  }}>
                        Eliminar
                  </div>

                  {/* Tarjeta principal deslizable */}
                  <div
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        onPointerCancel={handlePointerUp}
                        style={{
                              transform: `translateX(${offset}px)`,
                              transition: offset === 0 ? 'transform 0.2s ease-out' : 'none',
                              background: 'white',
                              position: 'relative',
                              padding: '16px',
                              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                              cursor: isDraggingRef.current ? 'grabbing' : 'grab',
                              touchAction: 'pan-y'
                        }}
                  >
                        {children}
                  </div>
            </div>
      );
};