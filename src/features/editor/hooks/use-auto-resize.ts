import { fabric } from "fabric";
import { useCallback, useEffect } from "react";

interface UseAutoResizeProps {
  canvas: fabric.Canvas | null;
  container: HTMLDivElement | null;
}

export const useAutoResize = ({ canvas, container }: UseAutoResizeProps) => {
  const autoZoom = useCallback(() => {
    if (!canvas || !container) return;

    // 1. Get container size
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    // 2. Resize canvas to fit container
    canvas.setWidth(width);
    canvas.setHeight(height);

    // 3. Find the center of canvas
    const center = canvas.getCenter();

    const zoomRatio = 0.85;

    // 4. Find the "clip" object (used as workspace)
    const localWorkSpace = canvas
      .getObjects()
      .find((object) => object.name === "clip") as fabric.Rect | undefined;

    if (!localWorkSpace) return;

    // 5. Scale the workspace to fit container
    //@ts-ignore
    const scale = fabric.util.findScaleToFit(localWorkSpace, {
      width,
      height,
    });

    const zoom = zoomRatio * scale;

    // 6. Reset transform to identity matrix
    canvas.setViewportTransform(fabric.iMatrix.concat());

    // 7. Zoom into canvas center
    canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoom);

    // 8. Calculate how to center the workspace on the canvas
    const workspaceCenter = localWorkSpace.getCenterPoint();
    const viewportTransform = canvas.viewportTransform;

    if (
      canvas.width === undefined ||
      canvas.height === undefined ||
      !viewportTransform
    ) {
      return;
    }

    // 9. Translate canvas so workspace is centered
    viewportTransform[4] =
      canvas.width / 2 - workspaceCenter.x * viewportTransform[0];

    viewportTransform[5] =
      canvas.height / 2 - workspaceCenter.y * viewportTransform[3];

    canvas.setViewportTransform(viewportTransform);

    // 10. Clone the workspace object as a clipPath
    localWorkSpace.clone((cloned: fabric.Object) => {
      canvas.clipPath = cloned;
      canvas.requestRenderAll();
    });
  }, [canvas, container]);

  useEffect(() => {
    let resizeObserver: ResizeObserver | null = null;

    if (canvas && container) {
      // 11. Observe the container for size changes
      resizeObserver = new ResizeObserver(() => {
        autoZoom(); // Trigger zoom when size changes
      });

      resizeObserver.observe(container);
    }

    return () => {
      // 12. Cleanup
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [canvas, container, autoZoom]);
};
