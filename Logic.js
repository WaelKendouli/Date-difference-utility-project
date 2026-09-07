 // ✅ Date inputs
      const startDateInput = document.getElementById("startDate");
      const endDateInput = document.getElementById("endDate");

      // ✅ Options (checkboxes)
      const autoSwapInput = document.getElementById("autoSwap");
      const inclusiveDaysInput = document.getElementById("inclusiveDays");

      // ✅ Buttons
      const btnCalc = document.getElementById("btnCalc");
      const btnDemo = document.getElementById("btnDemo");
      const btnClear = document.getElementById("btnClear");

      // ✅ Outputs (result numbers)
      const outDays = document.getElementById("outDays");
      const outWeeks = document.getElementById("outWeeks");
      const outMonths = document.getElementById("outMonths");
      const outYears = document.getElementById("outYears");

      // ✅ Extra lines
      const rangeLine = document.getElementById("rangeLine");
      const breakdownLine = document.getElementById("breakdownLine");

      // ✅ UI feedback
      const msgBox = document.getElementById("msgBox");
      const statusChip = document.getElementById("statusChip");
      const todayChip = document.getElementById("todayChip");


        const msPerDay = 24*60*60*1000;

      function formatDate(date) {
        return date.toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "2-digit",
        });
      }

      function stripTime(date)
      {
        return new Date(date.getFullYear() , date.getMonth() , date.getDate());
      }

      function parseDateInput(value)
      {
        const [y,m,d] = value.split("-").map(Number);
        return new Date(y , m - 1 , d);
      }

      function showMessage(type, text) {
        msgBox.classList.remove("good", "bad");
        if (type === "good") msgBox.classList.add("good");
        if (type === "bad") msgBox.classList.add("bad");
        msgBox.textContent = text;
      }

      function setStatus(text) {
        statusChip.textContent = text;
      }

      function resetOutputs() {
        outDays.textContent = "—";
        outWeeks.textContent = "—";
        outMonths.textContent = "—";
        outYears.textContent = "—";
        rangeLine.textContent = "Range: —";
        breakdownLine.textContent = "Breakdown: —";
        setStatus("Waiting…");
      }


      function diffCalendarMonths(start , end)
      {
        let MonthsDiff = ((end.getFullYear() - start.getFullYear()) * 12) +
        (end.getMonth() - start.getMonth());

        if (end.getDate() > start.getDate()) {
            MonthsDiff--;
        }

        return Math.max(0,MonthsDiff);

      }

      function diffCalendarYears(start , end)
      {
        let years = end.getFullYear() - start.getFullYear();

        if (start.getMonth() > end.getMonth() ||
         (start.getMonth()===end.getMonth() && start.getDate() > end.getDate())) {
            years -= 1;
        }
        return Math.max(0,years);
      }


      function calculateDateDiff()
      {
        const startVal = startDateInput.value;
        const endVal = endDateInput.value;

          if (!startVal || !endVal) {
          showMessage("bad", "❌ Please choose BOTH start and end dates.");
          resetOutputs();
          return;
        }

        let start = stripTime(parseDateInput(startVal));
        let end = stripTime(parseDateInput(endVal));
            if (start > end) {
                if (autoSwapInput.checked) {
                    [start , end] = [end , start];
                    showMessage(
              "neutral",
              "📌 Dates were swapped (start was after end)."
            );
                }
                else
                {
                    showMessage(
              "bad",
              "❌ Start date must be before end date (or enable auto-swap)."
            );
            resetOutputs();
            return; 
                }
                }
                else
                {
                              showMessage("good", "✅ Date difference calculated successfully.");
                }

               let totalDays = Math.round((end - start) / msPerDay);

               if (inclusiveDaysInput.checked) {
          totalDays += 1;
             }

             let totalWeeks = Math.round(totalDays / 7);
             const calMonths = diffCalendarMonths(start , end);
             const calYears = diffCalendarYears(start , end);

               outDays.textContent = totalDays.toLocaleString();
        outWeeks.textContent = totalWeeks.toFixed(2);
        outMonths.textContent = calMonths.toLocaleString();
        outYears.textContent = calYears.toLocaleString();

        // ✅ Update explanation lines
        rangeLine.textContent = `Range: ${formatDate(start)} → ${formatDate(
          end
        )}`;

        breakdownLine.textContent = `Breakdown: ${totalDays.toLocaleString()} days ≈ ${totalWeeks.toFixed(
          2
        )} weeks | ${calMonths.toLocaleString()} full months | ${calYears.toLocaleString()} full years`;

        setStatus("Calculated ✅");

      }

      todayChip.textContent = `Today: ${formatDate(new Date())}`;

      // ✅ Main calculate button
      btnCalc.addEventListener("click", calculateDateDiff);

      btnDemo.addEventListener("click" , () => {
        const end = stripTime(new Date());
        const start = new Date(end);
        start.setDate(start.getDate()-90);

        const toISO = (d) => {
          const yyyy = d.getFullYear();
          const mm = String(d.getMonth() + 1).padStart(2, "0");
          const dd = String(d.getDate()).padStart(2, "0");
          return `${yyyy}-${mm}-${dd}`;
        };

        startDateInput.value = toISO(start);
        endDateInput.value = toISO(end);

        setStatus("Ready…");
        showMessage(
          "neutral",
          "📌 Demo dates set (last 90 days). Click Calculate."
        );
      }
      );

      btnClear.addEventListener("click", () => {
        startDateInput.value = "";
        endDateInput.value = "";
        autoSwapInput.checked = true;
        inclusiveDaysInput.checked = false;
        resetOutputs();
        showMessage(
          "neutral",
          "Tip: Pick start/end dates, then click “Calculate Difference”."
        );
      });

      [startDateInput , endDateInput , autoSwapInput , inclusiveDaysInput].forEach(
        (elm) => {
            elm.addEventListener("change" , () => {
                setStatus("Ready…");
            })
        }
      )