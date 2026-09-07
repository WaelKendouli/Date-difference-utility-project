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
        let MonthsDiff = ((start.getFullYear() - end.getFullYear()) * 12) +
        (end.getMonth() - start.getMonth());

        if (end.getDate() > start.getDate()) {
            MonthsDiff--;
        }

        return Math.max(0,MonthsDiff);

      }